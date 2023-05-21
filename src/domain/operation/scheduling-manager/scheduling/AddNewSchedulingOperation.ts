import { container } from "tsyringe";
import { SchedulingParams } from "../../../../application/model/scheduling-manager/scheduling/SchedulingParams";
import { SchedulingResult } from "../../../../application/model/scheduling-manager/scheduling/SchedulingResult";
import logger from "../../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { OperationTemplate } from "../../../../infrestructure/template/OperationTemplate";
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
import { SchedulingHistory } from "../../../model/SchedulingHistory";
import { SchedulingUtil } from "../../util/SchedulingUtil";
import { ErrorExceptionClass } from "../../../../infrestructure/exceptions/ErrorExceptionClass";
import { ISchedulingCategoryEngineRepository } from "../../../repository/ISchedulingCategoryEngineRepository";


export class AddNewSchedulingOperation extends OperationTemplate<SchedulingResult, SchedulingParams>{


    private readonly schedulingEngineRepository: ISchedulingEngineRepository;
    private readonly schedulingTimeEngineRepository: ISchedulingTimeEngineRepository;
    private readonly hollydayEngineRepository: IHollydayEngineRepository;
    private readonly schedulingHistoryEnginerepository: ISchedulingHistoryEngineRepository;
    private readonly citizenEngineRepository: ICitizenEngineRepository;
    private readonly schedulingCategoryEngineRepository: ISchedulingCategoryEngineRepository;


    private semaphore: Semaphore;
    private citizen: Citizen

    private totalAvailableCollaborators = 0;



    constructor() {
        super(OperationNamesEnum.SCHEDULING_CREATE)
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository')
        this.schedulingTimeEngineRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository");
        this.hollydayEngineRepository = container.resolve<IHollydayEngineRepository>("IHollydayEngineRepository");
        this.schedulingHistoryEnginerepository = container.resolve<ISchedulingHistoryEngineRepository>('ISchedulingHistoryEngineRepository')
        this.citizenEngineRepository = container.resolve<ICitizenEngineRepository>('ICitizenEngineRepository')
        this.schedulingCategoryEngineRepository = container.resolve<ISchedulingCategoryEngineRepository>('ISchedulingCategoryEngineRepository')
    }


    protected async doValidateParameters(params: SchedulingParams): Promise<void> {


        logger.info("[AddNewSchedulingOperation] Begin of strict validation scheduling parameteres...")


        this.totalAvailableCollaborators = await SchedulingUtil.strictSchedulingValidate(
            params.getSchedulingDate,
            params.getSchedulingHour,
            params.getserviceCode,
            params.getCategoryCode,
            params.getCitizenEmail,
            params.getCitizenMobileNumber,
            this.citizenEngineRepository,
            this.hollydayEngineRepository,
            this.schedulingTimeEngineRepository,
            this.schedulingEngineRepository,
            this.schedulingCategoryEngineRepository)


        logger.info("[AddNewSchedulingOperation] End of strict validation scheduling time parameteres...")
    }

    protected async doExecute(params: SchedulingParams, result: SchedulingResult): Promise<void> {


        logger.info("Acquire semaphore with desired concurrency level of acess: Depend of available collaborator number ")

        this.semaphore = new Semaphore(this.totalAvailableCollaborators);

        logger.info("[AddNewSchedulingOperation] Begin make scheduling with concurrency..")

        try {

            logger.info("Acquire the semaphore to gain access to the critical section")
            await this.semaphore.acquire();

            const slotIsNotVailable: boolean = await SchedulingUtil.checkIfSlotAvailabe(params.getSchedulingDate, params.getSchedulingHour,
                this.totalAvailableCollaborators, this.schedulingHistoryEnginerepository)

            if (slotIsNotVailable) {
                throw new InvalidParametersException(Field.SCHEDULING_HOUR,
                    MiddlewareBusinessMessage.SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON)
            }

            const newScheduling = await this.performScheduling(params);

            await SchedulingUtil.isTobeBlockDateAndHour(newScheduling.chosenHour, newScheduling.date,
                this.totalAvailableCollaborators,
                this.schedulingHistoryEnginerepository)


            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_ADDED));

            result.setStatus = Object.fromEntries(this.message)
            result.setScheduling = newScheduling;


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

        logger.info("[AddNewSchedulingOperation] Start Sending Email...")

        await SchedulingUtil.sendSchedulingByEmail(newScheduling)

        logger.info("[AddNewSchedulingOperation] Email sent")

        return newScheduling;

    }



    private async createScheduling(params: SchedulingParams, citizen: Citizen): Promise<Scheduling> {
        const newScheduling = new Scheduling();

        logger.info("[AddNewSchedulingOperation] Begin constructing Scheduling object to be save in Data Base...")


        logger.info("[AddNewSchedulingOperation] Citizen  returned: " + JSON.stringify(citizen))

        newScheduling.creationDate = new Date();
        newScheduling.citizen = citizen;
        newScheduling.category = params.getCategoryCode.trim();
        newScheduling.service = params.getserviceCode.trim();
        newScheduling.date = params.getSchedulingDate.trim();
        newScheduling.chosenHour = params.getSchedulingHour.trim();
        newScheduling.hour = await SchedulingTimeUtil.getTimePart(params.getSchedulingHour)
        newScheduling.minute = await SchedulingTimeUtil.getMinutePart(params.getSchedulingHour)
        newScheduling.status = SchedulingStatusEnum.FOR_ANSWERING;

        logger.info("[AddNewSchedulingOperation] Saving user scheduling in Data Base: " + JSON.stringify(newScheduling))

        return await this.schedulingEngineRepository.save(newScheduling);

    }

    private async createSchedulingHistory(scheduling: Scheduling): Promise<void> {

        logger.info("[AddNewSchedulingOperation] Begin adding scheduling history in Data Base...")

        const newSchedulingHistory = new SchedulingHistory();

        newSchedulingHistory.creationDate = new Date();
        newSchedulingHistory.date = scheduling.date;
        newSchedulingHistory.chosenHour = scheduling.chosenHour;
        newSchedulingHistory.scheduling = scheduling
        newSchedulingHistory.available = true;

        await this.schedulingHistoryEnginerepository.save(newSchedulingHistory)

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


    protected initResult(): SchedulingResult {
        return new SchedulingResult()
    }

}