import { container } from "tsyringe";
import { AddNewSchedulingParams } from "../../../../application/model/scheduling-manager/scheduling/AddNewSchedulingParams";
import { SchedulingResult } from "../../../../application/model/scheduling-manager/scheduling/AddNewSchedulingResult";
import logger from "../../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { NotImplementedException } from "../../../../infrestructure/exceptions/NotImplementedException";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { OperationTemplate } from "../../../../infrestructure/template/OperationTemplate";
import { SchedulingTimeConfiguration } from "../../../model/SchedulingTimeConfiguration";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { IHollydayEngineRepository as IHollydayEngineRepository } from "../../../repository/IHollydayEngineRepository";
import { ISchedulingHistoryEngineRepository } from "../../../repository/ISchedulingHistoryEngineRespository";
import { ISchedulingTimeEngineRepository } from "../../../repository/ISchedulingTimeEngineRepository";
import { SchedulingTimeUtil } from "../../util/SchedulingTimeUtil";
import { Scheduling } from "../../../model/Scheduling";
import { ISchedulingEngineRepository } from "../../../repository/ISchedulingEngineRepository";
import Semaphore from "semaphore-async-await";
import { Citizen } from "../../../model/Citizen";
import { ICitizenEngineRepository } from "../../../repository/ICitizenEngineRepository";
import { SchedulingStatusEnum } from "../../../model/enum/SchedulingStatus.Enum";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { UnsuccessfullOperationException } from "../../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { SchedulingHistory } from "../../../model/SchedulingHistory";


export class AddNewSchedulingOperation extends OperationTemplate<SchedulingResult, AddNewSchedulingParams>{


    private schedulingEngineRepository: ISchedulingEngineRepository;
    private schedulingTimeEngineRepository: ISchedulingTimeEngineRepository;
    private hollydayEngineRepository: IHollydayEngineRepository;
    private schedulingHistoryEnginerepository: ISchedulingHistoryEngineRepository;
    private citizenEngineRepository: ICitizenEngineRepository
    private schedulingTimeEntity: SchedulingTimeConfiguration;

    private semaphore: Semaphore;
    private citizen: Citizen
    private schedulingDateInput: Date;
    private schedulings: SchedulingHistory[] = [];


    constructor() {
        super(OperationNamesEnum.SCHEDULING_CREATE)
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository')
        this.schedulingTimeEngineRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository");
        this.hollydayEngineRepository = container.resolve<IHollydayEngineRepository>("IHollydayEngineRepository");
        this.schedulingHistoryEnginerepository = container.resolve<ISchedulingHistoryEngineRepository>('ISchedulingHistoryEngineRepository')
        this.citizenEngineRepository = container.resolve<ICitizenEngineRepository>('ICitizenEngineRepository')
    }


    protected async doValidateParameters(params: AddNewSchedulingParams): Promise<void> {


        logger.info("[AddNewSchedulingOperation] Begin of strict validation scheduling parameteres...")


        this.schedulingTimeEntity = await this.schedulingTimeEngineRepository.findBySchedulingDate(this.schedulingDateInput)

        logger.info("[AddNewSchedulingOperation] Scheduling entity founded: %s", JSON.stringify(this.schedulingTimeEntity))

        const availableScheduling = this.schedulingTimeEntity[0] === 0;
        console.log("Scheduling entity returned:" + JSON.stringify(this.schedulingTimeEntity[0]))

        if (!this.schedulingTimeEntity[0]) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_CONFIG_NOT_EXIST);
        }

        logger.info("[AddNewSchedulingOperation] Check available date and hour to schedule...")

        this.schedulings = await this.schedulingHistoryEnginerepository
            .countNumberOfSchedulingByDateandHour(params.getSchedulingDate, params.getSchedulingHour)

        const numberOfScehdulingByDateAndHour = this.schedulings.length;
        const availableCollaboratorNumber = this.schedulingTimeEntity[0].availableCollaboratorNumber;

        if (numberOfScehdulingByDateAndHour > availableCollaboratorNumber) {
            throw new InvalidParametersException(Field.SCHEDULING_HOUR, MiddlewareBusinessMessage.SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON)
        }



        this.schedulingDateInput = new Date(params.getSchedulingDate);

        const beginDate = new Date(params.getSchedulingDate);

        const dateWithoutHour = await SchedulingTimeUtil.getDateWithoutHour(new Date());
        const currentDate = new Date(dateWithoutHour);


        if (beginDate <= currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE)
        }


        logger.info("[AddNewSchedulingOperation] schedulingDateinput converted %s", this.schedulingDateInput)

        const isWeekend = await SchedulingTimeUtil.isweekend(this.schedulingDateInput);

        const isHollyday = await SchedulingTimeUtil.isHollyDay(this.schedulingDateInput, this.hollydayEngineRepository, "[AddNewSchedulingOperation]")


        if (isWeekend || isHollyday) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_CONFIG_NOT_EXIST);
        }



        logger.info("[AddNewSchedulingOperation] Begin validate scheduling features...", this.schedulingDateInput)

        const isSameSchedulingFeature = await this.schedulingEngineRepository
            .valideSchedulingFeature(params.getSchedulingDate,
                params.getSchedulingHour,
                params.getCitizenEmail,
                params.getSchedulingCategory,
                params.getSchedulingService,
            )

        if (isSameSchedulingFeature) {
            throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.SCHEDULING_ALREADY_EXIST);
        }

        logger.info("[AddNewSchedulingOperation] End of strict validation scheduling time parameteres...")
    }

    protected async doExecute(params: AddNewSchedulingParams, result: SchedulingResult): Promise<void> {


        logger.info("Acquire semaphore with desired concurrency level of acess: Depend of available collaborator number ")

        const availableCollaboratorNumber = this.schedulingTimeEntity[0].availableCollaboratorNumber;

        this.semaphore = new Semaphore(availableCollaboratorNumber);

        logger.info("[AddNewSchedulingOperation] Begin make scheduling with concurrency.. ")

        try {

            logger.info("Acquire the semaphore to gain access to the critical section")
            await this.semaphore.acquire();

            const newScheduling = await this.saveSchedulingInfo(params);
            await this.isTobeBlockDateAndHour(newScheduling, availableCollaboratorNumber, params.getSchedulingDate)

            result.setScheduling = newScheduling;

            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_ADDED));

            result.setErrorMessages = Object.fromEntries(this.message)


        } catch (error) {
            logger.info("[AddNewSchedulingOperation] Errorr while acquire semaphore:" + error)
            throw new UnsuccessfullOperationException(Field.SYSTEM, "Erro ao realziar o agendamento")
        } finally {
            this.semaphore.release();
        }
    }

    private async saveSchedulingInfo(params: AddNewSchedulingParams): Promise<Scheduling> {


        logger.info("[AddNewSchedulingOperation] Begin constructing Scheduling object to be save in Data Base...")

        const newScheduling = new Scheduling();


        const citizen = await this.createAdhocCitizen(params.getCitizenFullName, params.getCitizenEmail, params.getCitizenMobileNumber)

        logger.info("[AddNewSchedulingOperation][saveScehdulingInfo] Citizen  returned: " + JSON.stringify(citizen))

        newScheduling.creationDate = new Date();
        newScheduling.citizen = citizen;
        newScheduling.category = params.getSchedulingCategory;
        newScheduling.service = params.getSchedulingService;
        newScheduling.schedulingDate = params.getSchedulingDate;
        newScheduling.chosenHour = params.getSchedulingHour;
        newScheduling.status = SchedulingStatusEnum.FOR_ANSWERING;


        logger.info("[AddNewSchedulingOperation] Scheduling object created to be saved in Data Base: " + JSON.stringify(newScheduling))

        const scheduleSaved = await this.schedulingEngineRepository.saveScheduling(newScheduling);
        await this.createSchedulingHistory(scheduleSaved, true)

        return scheduleSaved;


    }

    private async createAdhocCitizen(citizenFullName: string, citizenEmail: string, userMobileNumber: string): Promise<Citizen> {


        logger.info("[AddNewSchedulingOperation] Searching citizen in Data Base...")

        this.citizen = await this.citizenEngineRepository.findCitizenByEmail(citizenEmail)

        if (this.citizen) {
            logger.info("[AddNewSchedulingOperation] Return founded citizen:" + this.citizen.citizenEmail)
            return this.citizen;
        }

        logger.info("[AddNewSchedulingOperation] Begin create and add new citizen in Data Base...")

        const newCitizen = new Citizen();

        newCitizen.citizenFullName = citizenFullName;
        newCitizen.citizenEmail = citizenEmail;
        newCitizen.citizenMobileNumber = userMobileNumber;
        newCitizen.citizenCreationDate = new Date;

        return await this.citizenEngineRepository.saveCitizen(newCitizen);

    }

    private async isTobeBlockDateAndHour(scheduling: Scheduling, availableCollaboratorNumber: number, schedulingDate: string): Promise<void> {

        logger.info("[AddNewSchedulingOperation] Begin validate is to be block date and hour... ")
        this.schedulings = await this.schedulingHistoryEnginerepository
            .countNumberOfSchedulingByDateandHour(schedulingDate, scheduling.chosenHour)

        logger.info("[AddNewSchedulingOperation] List of scheduling returned by schedulingDate and schedulingHour parameters %", this.schedulings)
        const numberOfScehdulingByDateAndHour = this.schedulings.length;

        logger.info("[AddNewSchedulingOperation] numberOfScehdulingByDateAndHour lenght returned %s", numberOfScehdulingByDateAndHour)
        logger.info("[AddNewSchedulingOperation] Available collaborator number %s", availableCollaboratorNumber)

        if (numberOfScehdulingByDateAndHour == availableCollaboratorNumber) {
            await this.createSchedulingHistory(scheduling, false);
        }
    }

    private async createSchedulingHistory(scheduling: Scheduling, isAvailable: boolean): Promise<void> {

        logger.info("[AddNewSchedulingOperation] Begin adding scheduling history in Data Base...")

        const newSchedulingHistory = new SchedulingHistory();

        newSchedulingHistory.creationDate = new Date();
        newSchedulingHistory.schedulingDate = scheduling.schedulingDate;
        newSchedulingHistory.chosenHour = scheduling.chosenHour;
        newSchedulingHistory.scheduling = scheduling
        newSchedulingHistory.available = isAvailable;

        await this.schedulingHistoryEnginerepository.saveSchedulingHistory(newSchedulingHistory)

    }


    protected initResult(): SchedulingResult {
        return new SchedulingResult()
    }

}