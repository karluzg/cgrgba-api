import { container } from "tsyringe";
import { SchedulingParams } from "../../../../application/model/scheduling-manager/scheduling/SchedulingParams";
import { SchedulingResult } from "../../../../application/model/scheduling-manager/scheduling/SchedulingResult";
import logger from "../../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
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
import { SchedulingStatusEnum } from "../../../model/enum/SchedulingStatusEnum";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { UnsuccessfullOperationException } from "../../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { SchedulingHistory } from "../../../model/SchedulingHistory";
import { SchedulingUtil } from "../../util/SchedulingUtil";


export class AddNewSchedulingOperation extends OperationTemplate<SchedulingResult, SchedulingParams>{


    private readonly schedulingEngineRepository: ISchedulingEngineRepository;
    private readonly schedulingTimeEngineRepository: ISchedulingTimeEngineRepository;
    private readonly hollydayEngineRepository: IHollydayEngineRepository;
    private readonly schedulingHistoryEnginerepository: ISchedulingHistoryEngineRepository;
    private readonly citizenEngineRepository: ICitizenEngineRepository



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


    protected async doValidateParameters(params: SchedulingParams): Promise<void> {


        logger.info("[AddNewSchedulingOperation] Begin of strict validation scheduling parameteres...")

        this.schedulingDateInput = new Date(params.getSchedulingDate);

        this.schedulingTimeEntity = await this.schedulingTimeEngineRepository.findBySchedulingDate(this.schedulingDateInput)

        logger.info("[AddNewSchedulingOperation] Scheduling entity founded: %s", JSON.stringify(this.schedulingTimeEntity[0]))


        if (!this.schedulingTimeEntity[0]) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }


        logger.info("[AddNewTimeSlotOperation] Validate Pair -> SchedulinDate and hour")

        const hourList = this.schedulingTimeEntity[0].hours;
        let foundMatchHour: boolean = false;

        for (const inputHour of hourList) {

            if (inputHour == params.getSchedulingHour) {
                foundMatchHour = true;
            }
        }

        if (!foundMatchHour) {
            throw new InvalidParametersException(Field.SCHEDULING_HOUR, MiddlewareBusinessMessage.SCHEDULING_TIME_HOUR_CONFIG_NOT_EXIST);
        }


        logger.info("[AddNewSchedulingOperation] Verify if begin date is less than the current date...")


        const beginDate = new Date(params.getSchedulingDate);

        const currentDate = new Date();


        if (beginDate <= currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE)
        }


        logger.info("[AddNewSchedulingOperation] Verify available date and hour to schedule...")

        this.schedulings = await this.schedulingHistoryEnginerepository
            .countNumberOfSchedulingByDateandHour(params.getSchedulingDate, params.getSchedulingHour)

        logger.info("[AddNewSchedulingOperation] Schedulings entity founded %s", JSON.stringify(this.schedulings))

        const numberOfScehdulingByDateAndHour = this.schedulings.length;
        const availableCollaboratorNumber = this.schedulingTimeEntity[0].availableCollaboratorNumber;

        if (numberOfScehdulingByDateAndHour >= availableCollaboratorNumber) {
            throw new InvalidParametersException(Field.SCHEDULING_HOUR, MiddlewareBusinessMessage.SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON)
        }


        logger.info("[AddNewSchedulingOperation] Verify scheduling date is weekend or hollyday")

        const isWeekend = await SchedulingTimeUtil.isweekend(this.schedulingDateInput);

        const isHollyday = await SchedulingTimeUtil.isHollyDay(this.schedulingDateInput, this.hollydayEngineRepository,
            "[AddNewSchedulingOperation]")


        if (isWeekend || isHollyday) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }


        logger.info("[AddNewSchedulingOperation] Begin searching Citizen by email in Data Base to satrt validation of scheduling features...")

        this.citizen = await this.citizenEngineRepository.findCitizenByEmailOrMobileNumber(params.getCitizenEmail, params.getCitizenMobileNumber);

        logger.info("[AddNewSchedulingOperation] Citizen was founded %", this.citizen);

        if (this.citizen) {

            logger.info("[AddNewSchedulingOperation] Begin validate scheduling features for citizen...")

            const isNotValidchedulingFeature = await SchedulingUtil.validateCitizenSchedulingFeature(params,
                this.schedulingEngineRepository);

            logger.info("[AddNewSchedulingOperation]  Watch the validatio scheduling feature output:", isNotValidchedulingFeature)

            if (isNotValidchedulingFeature) {
                throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.SCHEDULING_ALREADY_EXIST);
            }
        }

        logger.info("[AddNewSchedulingOperation] End of strict validation scheduling time parameteres...")
    }

    protected async doExecute(params: SchedulingParams, result: SchedulingResult): Promise<void> {


        logger.info("Acquire semaphore with desired concurrency level of acess: Depend of available collaborator number ")

        const availableCollaboratorNumber = this.schedulingTimeEntity[0].availableCollaboratorNumber;

        this.semaphore = new Semaphore(availableCollaboratorNumber);

        logger.info("[AddNewSchedulingOperation] Begin make scheduling with concurrency..")

        try {

            logger.info("Acquire the semaphore to gain access to the critical section")
            await this.semaphore.acquire();

            const newScheduling = await this.createNewScheduling(params);
            await this.isTobeBlockDateAndHour(newScheduling, availableCollaboratorNumber, params.getSchedulingDate)

            result.setScheduling = newScheduling;

            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_ADDED));

            result.setStatus = Object.fromEntries(this.message)


        } catch (error) {
            logger.error("[AddNewSchedulingOperation] Errorr while acquire semaphore:" + error)
            throw new UnsuccessfullOperationException(Field.SYSTEM, "Erro ao realziar o agendamento")
        } finally {
            this.semaphore.release();
        }
    }

    private async createNewScheduling(params: SchedulingParams): Promise<Scheduling> {


        logger.info("[AddNewSchedulingOperation] Begin constructing Scheduling object to be save in Data Base...")

        const newScheduling = new Scheduling();


        const citizen = await this.createAdhocCitizen(params.getCitizenFullName, params.getCitizenEmail, params.getCitizenMobileNumber)

        logger.info("[AddNewSchedulingOperation][saveScehdulingInfo] Citizen  returned: " + JSON.stringify(citizen))

        newScheduling.creationDate = new Date();
        newScheduling.citizen = citizen;
        newScheduling.category = params.getSchedulingCategory;
        newScheduling.service = params.getSchedulingService;
        newScheduling.date = params.getSchedulingDate;
        newScheduling.chosenHour = params.getSchedulingHour;
        newScheduling.hour = await SchedulingTimeUtil.getTimePart(params.getSchedulingHour)
        newScheduling.minute = await SchedulingTimeUtil.getMinutePart(params.getSchedulingHour)
        newScheduling.status = SchedulingStatusEnum.FOR_ANSWERING;


        logger.info("[AddNewSchedulingOperation] Scheduling object created to be saved in Data Base: " + JSON.stringify(newScheduling))

        const scheduleSaved = await this.schedulingEngineRepository.saveScheduling(newScheduling);
        await this.createSchedulingHistory(scheduleSaved, true)

        return scheduleSaved;


    }

    private async createAdhocCitizen(citizenFullName: string, citizenEmail: string, userMobileNumber: string): Promise<Citizen> {


        logger.info("[AddNewSchedulingOperation] Check is it a new citizen in Data Base...")

        if (this.citizen) {
            logger.info("[AddNewSchedulingOperation] Return founded citizen:" + this.citizen.email)
            return this.citizen;
        }

        logger.info("[AddNewSchedulingOperation] Begin create and add new citizen in Data Base...")

        const newCitizen = new Citizen();

        newCitizen.fullName = citizenFullName;
        newCitizen.email = citizenEmail;
        newCitizen.mobileNumber = userMobileNumber;

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
        newSchedulingHistory.dateate = scheduling.date;
        newSchedulingHistory.chosenHour = scheduling.chosenHour;
        newSchedulingHistory.scheduling = scheduling
        newSchedulingHistory.available = isAvailable;

        await this.schedulingHistoryEnginerepository.saveSchedulingHistory(newSchedulingHistory)

    }


    protected initResult(): SchedulingResult {
        return new SchedulingResult()
    }

}