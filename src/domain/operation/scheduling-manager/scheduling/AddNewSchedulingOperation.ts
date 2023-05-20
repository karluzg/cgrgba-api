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
import { EmailUtils } from "../../util/EmailUtils";
import { EmailTemplate } from "../../../../infrestructure/template/EmailTemplate";
import { ErrorExceptionClass } from "../../../../infrestructure/exceptions/ErrorExceptionClass";


export class AddNewSchedulingOperation extends OperationTemplate<SchedulingResult, SchedulingParams>{


    private readonly schedulingEngineRepository: ISchedulingEngineRepository;
    private readonly schedulingTimeEngineRepository: ISchedulingTimeEngineRepository;
    private readonly hollydayEngineRepository: IHollydayEngineRepository;
    private readonly schedulingHistoryEnginerepository: ISchedulingHistoryEngineRepository;
    private readonly citizenEngineRepository: ICitizenEngineRepository



    private schedulingTimeEntity: SchedulingTimeConfiguration[] = [];
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


        logger.info("[AddNewSchedulingOperation] Verify scheduling date is weekend or hollyday:" + params.getSchedulingDate)
        this.schedulingDateInput = new Date(params.getSchedulingDate);



        console.info("INPUT DATE CONVERTED:" + this.schedulingDateInput)

        const isWeekend = await SchedulingTimeUtil.isweekend(this.schedulingDateInput);

        const isHollyday = await SchedulingTimeUtil.isHollyDay(this.schedulingDateInput, this.hollydayEngineRepository,
            "[AddNewSchedulingOperation]")


        if (isWeekend || isHollyday) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }



        logger.info("[AddNewSchedulingOperation] validate if time configuration for the input date exist %" + this.schedulingDateInput)

        console.info("[AddNewSchedulingOperation] validate if time configuration for the input date exist %" + this.schedulingDateInput)

        this.schedulingTimeEntity = await this.schedulingTimeEngineRepository.findBySchedulingDate(this.schedulingDateInput)

        logger.info("[AddNewSchedulingOperation] Scheduling entity founded: %s", this.schedulingTimeEntity)
        console.info("[AddNewSchedulingOperation] Scheduling entity founded: %s", JSON.stringify(this.schedulingTimeEntity))


        if (this.schedulingTimeEntity.length == 0) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }


        logger.info("[AddNewTimeSlotOperation] Validate valid Pair -> SchedulinDate and hour")
        const matchHours: string[] = this.schedulingTimeEntity
            .flatMap(schedulingTime => schedulingTime.hours)
            .map(hour => hour.value)
            .filter(value => value === params.getSchedulingHour);

        console.info("MATCH HOURS:", matchHours);

        if (matchHours.length === 0) {
            throw new InvalidParametersException(Field.SCHEDULING_HOUR,
                MiddlewareBusinessMessage.SCHEDULING_TIME_HOUR_CONFIG_NOT_EXIST);
        }


        logger.info("[AddNewSchedulingOperation] Verify if begin date is less than the current date...")


        const beginDate = new Date(params.getSchedulingDate);

        const currentDate = new Date();

        if (beginDate <= currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE)
        }


        logger.info("[AddNewSchedulingOperation] Begin searching Citizen by email to satrt validation of scheduling features...")

        this.citizen = await this.citizenEngineRepository.findCitizenByEmailOrMobileNumber(params.getCitizenEmail,
            params.getCitizenMobileNumber);

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

        let totalAvailableCollaborators = 0;

        for (const scheduling of this.schedulingTimeEntity) {
            totalAvailableCollaborators = scheduling.availableCollaboratorNumber;
        }

        console.log("Total Available Collaborators: " + totalAvailableCollaborators);


        this.semaphore = new Semaphore(totalAvailableCollaborators);

        logger.info("[AddNewSchedulingOperation] Begin make scheduling with concurrency..")

        try {

            logger.info("Acquire the semaphore to gain access to the critical section")
            await this.semaphore.acquire();

            const slotVailable: boolean = await this.checkIfSlotAvailabe(params)

            if (slotVailable) {
                throw new InvalidParametersException(Field.SCHEDULING_HOUR,
                    MiddlewareBusinessMessage.SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON)
            }

            const newScheduling = await this.performScheduling(params);
            await this.isTobeBlockDateAndHour(newScheduling.chosenHour, newScheduling.date, totalAvailableCollaborators)

            result.setScheduling = newScheduling;

            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_ADDED));

            result.setStatus = Object.fromEntries(this.message)


        } catch (error) {

            if (error.errorClasseName == ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(Field.SCHEDULING_HOUR,
                    MiddlewareBusinessMessage.SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON)
            }
            logger.error("[AddNewSchedulingOperation] Errorr while acquire semaphore:" + error)

        } finally {
            this.semaphore.release();
        }
    }

    private async performScheduling(params: SchedulingParams): Promise<Scheduling> {


        const citizen = await this.createAdhocCitizenInfo(params.getCitizenFullName, params.getCitizenEmail, params.getCitizenMobileNumber)

        const newScheduling = await this.createScheduling(params, citizen)
        await this.createSchedulingHistory(newScheduling)

        logger.error("[AddNewSchedulingOperation] Start Sending Email...")
        await this.sendSchedulingByEmail(newScheduling)
        logger.error("[AddNewSchedulingOperation] Email sent")

        return newScheduling;

    }

    private async sendSchedulingByEmail(scheduling: Scheduling): Promise<void> {

        const emailMessage = await EmailUtils.generateSchedulingEmailBody(scheduling.citizen.fullName,
            scheduling.date, scheduling.chosenHour, scheduling.hour, scheduling.service)


        const emailTemplate = new EmailTemplate();
        const mailOption = await emailTemplate.createMailOption(scheduling.citizen.email, emailMessage);

        await emailTemplate.sendEmail(mailOption);
    }


    private async createScheduling(params: SchedulingParams, citizen: Citizen): Promise<Scheduling> {
        const newScheduling = new Scheduling();

        logger.info("[AddNewSchedulingOperation] Begin constructing Scheduling object to be save in Data Base...")


        logger.info("[AddNewSchedulingOperation] Citizen  returned: " + JSON.stringify(citizen))

        newScheduling.creationDate = new Date();
        newScheduling.citizen = citizen;
        newScheduling.category = params.getSchedulingCategory;
        newScheduling.service = params.getSchedulingService;
        newScheduling.date = params.getSchedulingDate;
        newScheduling.chosenHour = params.getSchedulingHour;
        newScheduling.hour = await SchedulingTimeUtil.getTimePart(params.getSchedulingHour)
        newScheduling.minute = await SchedulingTimeUtil.getMinutePart(params.getSchedulingHour)
        newScheduling.status = SchedulingStatusEnum.FOR_ANSWERING;

        logger.info("[AddNewSchedulingOperation] Saving user scheduling in Data Base: " + JSON.stringify(newScheduling))

        return await this.schedulingEngineRepository.saveScheduling(newScheduling);

    }

    private async createAdhocCitizenInfo(citizenFullName: string, citizenEmail: string, userMobileNumber: string): Promise<Citizen> {


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

        return await this.citizenEngineRepository.saveCitizenInfo(newCitizen);

    }

    private async isTobeBlockDateAndHour(schedulingDate: string, chosenHour: string, availableCollaboratorNumber: number,): Promise<void> {

        logger.info("[AddNewSchedulingOperation] Begin validate is to be block date and hour... ")
        this.schedulings = await this.schedulingHistoryEnginerepository
            .countNumberOfSchedulingByDateandHour(schedulingDate, chosenHour);

        logger.info("[AddNewSchedulingOperation] Schedulings returned by date hour %", this.schedulings)
        const numberOfScehdulingByDateAndHour = this.schedulings.length;

        logger.info("[AddNewSchedulingOperation] Number of scehduling by date Ann hour returned %s", numberOfScehdulingByDateAndHour)
        logger.info("[AddNewSchedulingOperation] Available collaborator number %s", availableCollaboratorNumber)

        if (numberOfScehdulingByDateAndHour == availableCollaboratorNumber) {
            await this.schedulingHistoryEnginerepository.blockDateAndHour(schedulingDate, chosenHour);
        }
    }

    private async createSchedulingHistory(scheduling: Scheduling): Promise<void> {

        logger.info("[AddNewSchedulingOperation] Begin adding scheduling history in Data Base...")

        const newSchedulingHistory = new SchedulingHistory();

        newSchedulingHistory.creationDate = new Date();
        newSchedulingHistory.date = scheduling.date;
        newSchedulingHistory.chosenHour = scheduling.chosenHour;
        newSchedulingHistory.scheduling = scheduling
        newSchedulingHistory.available = true;

        await this.schedulingHistoryEnginerepository.saveSchedulingHistory(newSchedulingHistory)

    }

    private async checkIfSlotAvailabe(params: SchedulingParams): Promise<boolean> {


        logger.info("[AddNewSchedulingOperation] Verify available date and hour to schedule...")

        this.schedulings = await this.schedulingHistoryEnginerepository
            .countNumberOfSchedulingByDateandHour(params.getSchedulingDate, params.getSchedulingHour)

        logger.info("[AddNewSchedulingOperation] Schedulings entity founded %s", JSON.stringify(this.schedulings))

        const numberOfScehdulingByDateAndHour = this.schedulings.length;
        const availableCollaboratorNumber = this.schedulingTimeEntity[0].availableCollaboratorNumber;
        console.info("NUMBER OF SCHEDULING:" + numberOfScehdulingByDateAndHour)

        console.info("NUMBER AVAILABLE COLLABORATOR:" + numberOfScehdulingByDateAndHour)

        return numberOfScehdulingByDateAndHour >= availableCollaboratorNumber

    }


    protected initResult(): SchedulingResult {
        return new SchedulingResult()
    }

}