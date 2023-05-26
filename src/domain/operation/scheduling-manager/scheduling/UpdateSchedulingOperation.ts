import { container } from "tsyringe";
import { SchedulingResult } from "../../../../application/model/scheduling-manager/scheduling/SchedulingResult";
import { UpdateSchedulingParams } from "../../../../application/model/scheduling-manager/scheduling/params/UpdateSchedulingParams";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { Scheduling } from "../../../model/Scheduling";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { ISchedulingEngineRepository } from "../../../repository/ISchedulingEngineRepository";
import { SchedulingEngineRepositoryImpl } from "../../../repository/impl/SchedulingEngineRepositoryImpl";
import { SchedulingUtil } from "../../util/SchedulingUtil";
import { ICitizenEngineRepository } from "../../../repository/ICitizenEngineRepository";
import { IHollydayEngineRepository } from "../../../repository/IHollydayEngineRepository";
import { ISchedulingHistoryEngineRepository } from "../../../repository/ISchedulingHistoryEngineRespository";
import { ISchedulingTimeEngineRepository } from "../../../repository/ISchedulingTimeEngineRepository";
import Semaphore from "semaphore-async-await";
import logger from "../../../../infrestructure/config/logger";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { ErrorExceptionClass } from "../../../../infrestructure/exceptions/ErrorExceptionClass";
import { Citizen } from "../../../model/Citizen";
import { SchedulingTimeUtil } from "../../util/SchedulingTimeUtil";
import { Service } from "../../../model/Service";
import { ISchedulingCategoryEngineRepository } from "../../../repository/ISchedulingCategoryEngineRepository";
import { SchedulingStatusEnum } from "../../../model/enum/SchedulingStatusEnum";
import { IServiceEngineRepository } from "../../../repository/IServiceEngineRepository";


export class UpdateSchedulingOperation extends UserAuthOperationTemplate<SchedulingResult, UpdateSchedulingParams>{

    private readonly schedulingEngineRepository: SchedulingEngineRepositoryImpl;
    private readonly schedulingTimeEngineRepository: ISchedulingTimeEngineRepository;
    private readonly hollydayEngineRepository: IHollydayEngineRepository;
    private readonly schedulingHistoryEnginerepository: ISchedulingHistoryEngineRepository;
    private readonly citizenEngineRepository: ICitizenEngineRepository
    private readonly schedulingCategoryEngineRepository: ISchedulingCategoryEngineRepository
    private serviceEngineReository: IServiceEngineRepository



    private schedulingEntitySource: Scheduling;
    private citizenEntitySource: Citizen
    private serviceEntity: Service;
    private totalAvailableCollaborators: number = 0;
    private semaphore: Semaphore;


    constructor() {
        super(OperationNamesEnum.SCHEDULING_UPDATE, OperationValidatorManager.getSingletonInstance())
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository')
        this.schedulingTimeEngineRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository");
        this.hollydayEngineRepository = container.resolve<IHollydayEngineRepository>("IHollydayEngineRepository");
        this.schedulingHistoryEnginerepository = container.resolve<ISchedulingHistoryEngineRepository>('ISchedulingHistoryEngineRepository')
        this.citizenEngineRepository = container.resolve<ICitizenEngineRepository>('ICitizenEngineRepository')
        this.schedulingCategoryEngineRepository = container.resolve<ISchedulingCategoryEngineRepository>('ISchedulingCategoryEngineRepository')
        this.serviceEngineReository = container.resolve<IServiceEngineRepository>('IServiceEngineRepository')
    }

    protected async doValidateParameters(params: UpdateSchedulingParams): Promise<void> {


        logger.info("[UpdateSchedulingOperation] Begin of high level validation scheduling parameteres...")

        this.schedulingEntitySource = await this.schedulingEngineRepository.findSchedulingById(params.getSchedulingId)

        if (!this.schedulingEntitySource) {
            throw new InvalidParametersException(Field.SCHEDULING_ID, MiddlewareBusinessMessage.SCHEDULING_ID_INVALID)
        }


        if (this.schedulingEntitySource.status.code !== SchedulingStatusEnum.FOR_ANSWERING) {
            throw new InvalidParametersException(Field.SCHEDULING_ID, MiddlewareBusinessMessage.SCHEDULING_ID_INVALID)
        }


        this.citizenEntitySource = await this.citizenEngineRepository.findCitizenByEmailOrMobileNumber(params.getCitizenEmail,
            params.getCitizenMobileNumber);


        if (this.citizenEntitySource) {
            throw new InvalidParametersException(Field.EMAIL, MiddlewareBusinessMessage.CITIZEN_INVALID_EMAIL)
        }


        const countEmail: number = await this.citizenEngineRepository.countEmailDuplicates(params.getCitizenEmail);

        if (!(this.citizenEntitySource.email === params.getCitizenEmail) && countEmail != 0) {

            throw new InvalidParametersException(Field.EMAIL, MiddlewareBusinessMessage.CITIZEN_INVALID_EMAIL)

        }

        const countMobileNumebr: number = await this.citizenEngineRepository.countMobileNumberDuplicates(params.getCitizenMobileNumber);


        if (!(this.citizenEntitySource.mobileNumber === params.getCitizenMobileNumber) && countMobileNumebr != 0) {
            throw new InvalidParametersException(Field.MOBILE_NUMBER, MiddlewareBusinessMessage.CITIZEN_MOBILE_NUMBER_ALREADY_EXIST)

        }

        this.serviceEntity = await SchedulingUtil.VailidateServiceMatchCategory(params.getCategory, params.getServiceCode,
            this.schedulingCategoryEngineRepository);



        this.totalAvailableCollaborators = await SchedulingUtil.strictSchedulingValidate(
            params.getSchedulingDate,
            params.getSchedulingHour,
            this.serviceEntity.code,
            this.citizenEntitySource,
            this.hollydayEngineRepository,
            this.schedulingTimeEngineRepository,
            this.schedulingEngineRepository)


    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: UpdateSchedulingParams, result: SchedulingResult): Promise<void> {


        logger.info("Acquire semaphore with desired concurrency level of acess: Depend of available collaborator number ")

        this.semaphore = new Semaphore(this.totalAvailableCollaborators);

        logger.info("[AddNewSchedulingOperation] Begin make scheduling with concurrency..")

        try {

            logger.info("Acquire the semaphore to gain access to the critical section")
            await this.semaphore.acquire();

            const slotIsNotVailable: boolean = await SchedulingUtil.checkIfSlotAvailabe(params.getSchedulingDate, params.getSchedulingHour,
                this.schedulingHistoryEnginerepository)

            if (slotIsNotVailable) {
                throw new InvalidParametersException(Field.SCHEDULING_HOUR,
                    MiddlewareBusinessMessage.SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON)
            }

            const newScheduling = await this.performScheduling(params, tokenSession);

            await SchedulingUtil.isTobeBlockDateAndHour(newScheduling,
                this.totalAvailableCollaborators,
                this.schedulingEngineRepository,
                this.schedulingHistoryEnginerepository)


            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_ADDED));

            result.setStatus = Object.fromEntries(this.message)
           // result.setScheduling = newScheduling;


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

    private async performScheduling(paramsTarget: UpdateSchedulingParams, tokenSession: TokenSession): Promise<Scheduling> {


        const updatedScheduling = await this.updateSheduling(paramsTarget)

       // await this.updateSchedulingHistory(updatedScheduling, tokenSession)

        logger.info("[AddNewSchedulingOperation] Start Sending Email...")

        await SchedulingUtil.sendSchedulingByEmail(updatedScheduling)

        logger.info("[AddNewSchedulingOperation] Email sent")

        return updatedScheduling;


    }

    private async updateSheduling(paramsTarget: UpdateSchedulingParams): Promise<Scheduling> {

        logger.info("[AddNewSchedulingOperation] Begin constructing Scheduling object to be save in Data Base...")
        const serviceDB: Service = await this.serviceEngineReository.findservice(this.schedulingEntitySource.service.code);
        this.schedulingEntitySource.creationDate = new Date();
        this.schedulingEntitySource.citizen = this.citizenEntitySource;
        this.schedulingEntitySource.service = serviceDB;
        this.schedulingEntitySource.date = paramsTarget.getSchedulingDate.trim();
        this.schedulingEntitySource.chosenHour = paramsTarget.getSchedulingHour.trim();
        this.schedulingEntitySource.hour = await SchedulingTimeUtil.getTimePart(paramsTarget.getSchedulingHour)
        this.schedulingEntitySource.minute = await SchedulingTimeUtil.getMinutePart(paramsTarget.getSchedulingHour)


        return await this.schedulingEngineRepository.updateScheduling(this.schedulingEntitySource);

    }


    protected initResult(): SchedulingResult {
        return new SchedulingResult()
    }

}


