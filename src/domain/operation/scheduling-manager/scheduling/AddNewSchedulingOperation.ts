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
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { SchedulingHistory } from "../../../model/SchedulingHistory";
import { SchedulingUtil } from "../../util/SchedulingUtil";
import { ErrorExceptionClass } from "../../../../infrestructure/exceptions/ErrorExceptionClass";
import { Service } from "../../../model/Service";
import { ISchedulingCategoryEngineRepository } from "../../../repository/ISchedulingCategoryEngineRepository";
import { ISchedulingPossibleStatusEngineRepository } from "../../../repository/IPossibleStatusEngineRepository";
import { SchedulingStatus } from "../../../model/SchedulingStatus";
import { tr } from "date-fns/locale";
import { UnsuccessfullOperationException } from "../../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { throws } from "assert";

export class AddNewSchedulingOperation extends OperationTemplate<SchedulingResult, SchedulingParams>{


    private readonly schedulingEngineRepository: ISchedulingEngineRepository;
    private readonly schedulingTimeEngineRepository: ISchedulingTimeEngineRepository;
    private readonly hollydayEngineRepository: IHollydayEngineRepository;
    private readonly schedulingHistoryEnginerepository: ISchedulingHistoryEngineRepository;
    private readonly citizenEngineRepository: ICitizenEngineRepository;
    private readonly schedulingCategoryEngineRepository: ISchedulingCategoryEngineRepository
    private readonly schedulingPossiblibleStatusEngineRepository: ISchedulingPossibleStatusEngineRepository


    private semaphore: Semaphore;
    private citizen: Citizen
    private serviceEntity: Service;

    private totalAvailableCollaborators = 0;


    constructor() {
        super(OperationNamesEnum.SCHEDULING_CREATE)
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository')
        this.schedulingTimeEngineRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository");
        this.hollydayEngineRepository = container.resolve<IHollydayEngineRepository>("IHollydayEngineRepository");
        this.schedulingHistoryEnginerepository = container.resolve<ISchedulingHistoryEngineRepository>('ISchedulingHistoryEngineRepository')
        this.citizenEngineRepository = container.resolve<ICitizenEngineRepository>('ICitizenEngineRepository')
        this.schedulingCategoryEngineRepository = container.resolve<ISchedulingCategoryEngineRepository>('ISchedulingCategoryEngineRepository')
        this.schedulingPossiblibleStatusEngineRepository = container.resolve<ISchedulingPossibleStatusEngineRepository>('ISchedulingPossibleStatusEngineRepository')

    }


    protected async doValidateParameters(params: SchedulingParams): Promise<void> {


        logger.info("[AddNewSchedulingOperation] Begin of strict validation scheduling parameteres...")

        this.serviceEntity = await SchedulingUtil.VailidateServiceMatchCategory(params.getCategoryCode, params.getserviceCode,
            this.schedulingCategoryEngineRepository);


        this.citizen = await this.citizenEngineRepository.findCitizenByEmailOrMobileNumber(params.getCitizenEmail,
            params.getCitizenMobileNumber);

        logger.info("[AddNewSchedulingOperation] Return founded citizen:" + this.citizen)

        this.totalAvailableCollaborators = await SchedulingUtil.strictSchedulingValidate(
            params.getSchedulingDate,
            params.getSchedulingHour,
            this.serviceEntity.code,
            this.citizen,
            this.hollydayEngineRepository,
            this.schedulingTimeEngineRepository,
            this.schedulingEngineRepository)



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
                this.schedulingHistoryEnginerepository)

            if (slotIsNotVailable) {
                throw new InvalidParametersException(Field.SCHEDULING_HOUR,
                    MiddlewareBusinessMessage.SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON)
            }

            const newScheduling: Scheduling = await this.performScheduling(params);

            await SchedulingUtil.isTobeBlockDateAndHour(newScheduling,
                this.totalAvailableCollaborators,
                this.schedulingEngineRepository,
                this.schedulingHistoryEnginerepository)

            const possibleStatus: SchedulingStatus[] = await this.schedulingPossiblibleStatusEngineRepository.findNextStatus(newScheduling.status)

            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_ADDED));

            result.setStatus = Object.fromEntries(this.message)


            result.setScheduling = newScheduling;
            result.setPossibleStatus = possibleStatus;



        } catch (error) {

            if (error.errorClasseName == ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(Field.SCHEDULING_HOUR,
                    MiddlewareBusinessMessage.SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON)
            } else {
                logger.error("[AddNewSchedulingOperation] Errorr while acquire semaphore:" + error)
                throw new InvalidParametersException(Field.SYSTEM,
                    error)
            }
        } finally {
            this.semaphore.release();
        }
    }

    private async performScheduling(params: SchedulingParams): Promise<Scheduling> {


        const citizen = await this.createAdhocCitizenInfo(params.getCitizenFullName, params.getCitizenEmail, params.getCitizenMobileNumber)

        const newScheduling = await this.createScheduling(params, citizen)



        logger.info("[AddNewSchedulingOperation] Start Sending Email...")

        await SchedulingUtil.sendSchedulingByEmail(newScheduling)

        logger.info("[AddNewSchedulingOperation] Email sent")

        return newScheduling;

    }

    private async createScheduling(params: SchedulingParams, citizen: Citizen): Promise<Scheduling> {
        const newScheduling = new Scheduling();


        logger.info("[AddNewSchedulingOperation] Begin constructing Scheduling object to be save in Data Base...")

        newScheduling.creationDate = new Date();
        newScheduling.citizen = citizen;
        newScheduling.service = this.serviceEntity;
        newScheduling.date = params.getSchedulingDate.trim();
        newScheduling.chosenHour = params.getSchedulingHour.trim();
        newScheduling.hour = await SchedulingTimeUtil.getTimePart(params.getSchedulingHour)
        newScheduling.minute = await SchedulingTimeUtil.getMinutePart(params.getSchedulingHour)


        logger.info("[AddNewSchedulingOperation] Saving user scheduling in Data Base: " + JSON.stringify(newScheduling))


        let schedulingSaved;
        try {

            schedulingSaved = await this.schedulingEngineRepository.saveScheduling(newScheduling);
        } catch (error) {
            throw new UnsuccessfullOperationException(Field.SYSTEM, "Error while trying to save scheduling:" + error)
        }

        return schedulingSaved;

    }


    private async createAdhocCitizenInfo(citizenFullName: string, citizenEmail: string, userMobileNumber: string): Promise<Citizen> {


        logger.info("[AddNewSchedulingOperation] Check is it a new citizen in Data Base...")

        if (this.citizen) {

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