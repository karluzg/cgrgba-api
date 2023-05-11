import { TokenSession } from "../../../model/TokenSession";
import { AddTimeSlotParams } from "../../../../application/model/scheduling-manager/schedulingTime/params/AddTimeSlotParams";
import { TimeSlotResult } from "../../../../application/model/scheduling-manager/schedulingTime/TimeSlotResult";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { container } from "tsyringe";
import { ISchedulingTimeEngineRepository } from "../../../repository/ISchedulingTimeEngineRepository";
import { SchedulingTimeConfiguration } from "../../../model/SchedulingTimeConfiguration";
import logger from "../../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { SchedulingTimeUtil } from "../../util/SchedulingTimeUtil";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { IHollydayEngineRepository as IHollydayEngineRepository } from "../../../repository/IHollydayEngineRepository";



export class AddNewTimeSlotOperation extends UserAuthOperationTemplate<TimeSlotResult, AddTimeSlotParams>{

    private schedulingTimeRepository: ISchedulingTimeEngineRepository;
    private hollydayEngineRepository: IHollydayEngineRepository;

    private schedulingTimeEntity: SchedulingTimeConfiguration;
    private dateList: Date[] = [];
    private hourListAdded: boolean = false;

    constructor() {
        super(OperationNamesEnum.TIME_SLOT_CREATE, new OperationValidatorManager)
        this.schedulingTimeRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository")
        this.hollydayEngineRepository = container.resolve<IHollydayEngineRepository>("IHollydayEngineRepository")
    }

    protected async doValidateParameters(params: AddTimeSlotParams): Promise<void> {


        logger.info("[AddNewTimeSlotOperation] Begin of strict validation scheduling time parameteres...")

        const schedulingDateInput = new Date(params.getBeginSchedulingDate);

        this.schedulingTimeEntity = await this.schedulingTimeRepository.findBySchedulingDate(schedulingDateInput)

        logger.info("[AddNewTimeSlotOperation] schedulingTime entity founded %", this.schedulingTimeEntity)

        if (this.schedulingTimeEntity[0]) {
            logger.error("[AddNewTimeSlotOperation] Scheduling time configuration already exist")
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_ALREADY_EXIST);
        }

        if (params.getAvailableCollaboratorNumber == 0) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER,
                MiddlewareBusinessMessage.SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER_MANDATORY)
        }


        const beginDate = new Date(params.getBeginSchedulingDate)
        const endDate = new Date(params.getEndSchedulingDate)

        const dateWithoutHour = await SchedulingTimeUtil.getDateWithoutHour(new Date())
        const currentDate = new Date(dateWithoutHour)

        logger.info("[AddNewTimeSlotOperation] BeginDate Scheduling Date%s", beginDate)
        logger.info("[AddNewTimeSlotOperation] Current Date%s", currentDate)

        if (endDate < beginDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_END_SCHEDULING_DATE_GREATHER_THAN_END_SCHEDULING_DATE)
        }

        if (beginDate <= currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE)
        }


        // Begin and End Work Time
        const beginWorkTime = await SchedulingTimeUtil.getBeginHourPart(params.getBeginWorkTime)
        const endWorkTime = await SchedulingTimeUtil.getBeginHourPart(params.getEndWorkTime)

        if (endWorkTime < beginWorkTime) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_WORK_TIME,
                MiddlewareBusinessMessage.SCHEDULING_TIME_END_WORK_TIME_GREATER_THAN_BEGIN_WORK_TIME)
        }


        // Begin and End lunch Time
        const beginLunchTime = await SchedulingTimeUtil.getBeginHourPart(params.getBeginLunchTime)
        const endLunchTime = await SchedulingTimeUtil.getBeginHourPart(params.getEndLunchTime)


        if (endLunchTime <= beginLunchTime) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_LUNCH_TIME,
                MiddlewareBusinessMessage.SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_END_LUNCH_TIME)

        }


        if (beginLunchTime <= beginWorkTime) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_LUNCH_TIME,
                MiddlewareBusinessMessage.SCHEDULING_TIME_BEGIN_LUNCH_TIME_GREATER_THAN_BEGIN_WORK_TIME)

        }

        if (beginLunchTime > endWorkTime) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_LUNCH_TIME,
                MiddlewareBusinessMessage.SCHEDULING_TIME_BEGIN_LUNCH_TIME_GREATER_THAN_END_WORK_TIME)

        }

        if (endLunchTime < beginWorkTime) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_LUNCH_TIME,
                MiddlewareBusinessMessage.SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_BEGIN_WORK_TIME)

        }

        logger.info("[GetTimeSlotListOperation] End of strict validation scheduling time parameteres...")

    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: AddTimeSlotParams, result: TimeSlotResult) {


        logger.info("[AddNewTimeSlotOperation] Begin generate hour list for each date...")

        await this.generateHourListBySchedulingDate(params, this.hollydayEngineRepository)


        if (!this.hourListAdded) {
            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_TIME_NOT_ADDED));
            result.setErrorMessages = Object.fromEntries(this.message)
        }
        else {

            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_TIME_ADDED));

            result.setErrorMessages = Object.fromEntries(this.message)

        }
    }

    async generateHourListBySchedulingDate(params: AddTimeSlotParams, hollydayRepository: IHollydayEngineRepository): Promise<void> {


        logger.info("[AddNewTimeSlotOperation] [Generate List by scheduling date] Rreceived params:" + params)

        await this.createSchedulingDateList(params.getBeginSchedulingDate, params.getEndSchedulingDate)

        logger.info("[AddNewTimeSlotOperation] Date list returned:" + this.dateList)

        for (const inputDate of this.dateList) {

            const isWeekend = await SchedulingTimeUtil.isweekend(inputDate);

            const isHollyday = await SchedulingTimeUtil.isHollyDay(inputDate, hollydayRepository, "[AddNewTimeSlotOperation]")

            console.log("is weekend?", isWeekend)
            console.log("is hollyday?", isHollyday)

            if (!isWeekend && !isHollyday) {

                const dateWithoutHour = await SchedulingTimeUtil.getDateWithoutHour(inputDate)

                const beginWorkDateTime = new Date(`${dateWithoutHour} ${params.getBeginWorkTime} `);

                let endBegingWorkDateTime = new Date(`${dateWithoutHour}  ${params.getBeginWorkTime} `);

                if (params.getEndSchedulingDate.length == 0) {


                    endBegingWorkDateTime = new Date(`${dateWithoutHour} ${params.getBeginWorkTime} `);

                } else {

                    endBegingWorkDateTime = new Date(`${dateWithoutHour} ${params.getEndWorkTime} `);
                }

                await this.createSchedulingTimeBySchedulingDate(inputDate, beginWorkDateTime, endBegingWorkDateTime, params);

            }

            logger.info("[AddNewTimeSlotOperation] input date is weekend or hollyday", inputDate)
        }
    }

    async createSchedulingDateList(begingSchedulingDateInput: string, endSchdulingDateInput: string): Promise<void> {

        const beginSchedulingDateConverted = new Date(begingSchedulingDateInput)
        const endSchedulingDateConverted = new Date(endSchdulingDateInput)

        while (beginSchedulingDateConverted <= endSchedulingDateConverted) {
            this.dateList.push(new Date(beginSchedulingDateConverted))
            beginSchedulingDateConverted.setDate(beginSchedulingDateConverted.getDate() + 1); // update beginSchedulingDateConverted adding +1 day
        }

    }

    async createSchedulingTimeBySchedulingDate(inputDate: Date, beginWorkDateTime: Date, endWorkDateTime: Date, params: AddTimeSlotParams): Promise<void> {

        const hourList: string[] = [];

        logger.info("[AddNewTimeSlotOperation] beginWorkDateTime received:", beginWorkDateTime)
        logger.info("[AddNewTimeSlotOperation] endWorkDateTime received:", endWorkDateTime)

        while (beginWorkDateTime <= endWorkDateTime && beginWorkDateTime.toDateString() === inputDate.toDateString()) {
            const hour = beginWorkDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            hourList.push(hour)
            beginWorkDateTime.setMinutes(beginWorkDateTime.getMinutes() + params.getServiceInterval); // update beginWorkDateTime adding service interval
        }

        logger.info("[AddNewTimeSlotOperation] InputDate to be Added %s and hour list %s", inputDate, hourList)

        await this.createNewScheduling(inputDate, params, hourList)


        if (hourList.length != 0) {
            this.hourListAdded = true;
        }

    }

    async createNewScheduling(inputDate: Date, params: AddTimeSlotParams, hourlistInput: string[]): Promise<void> {

        const newSchedulingTime = new SchedulingTimeConfiguration();

        newSchedulingTime.creationDate = new Date();
        newSchedulingTime.schedulingBeginDate = inputDate;

        newSchedulingTime.beginLunchTime = params.getBeginLunchTime;

        newSchedulingTime.endLunchTime = params.getBeginLunchTime;

        newSchedulingTime.serviceInterval = params.getServiceInterval;

        newSchedulingTime.availableCollaboratorNumber = params.getAvailableCollaboratorNumber;
        newSchedulingTime.hours = hourlistInput;


        if (hourlistInput.length != 0) {
            await this.saveSchedulingTime(newSchedulingTime)
        }

    }


    async saveSchedulingTime(newScehdulingTime: SchedulingTimeConfiguration): Promise<SchedulingTimeConfiguration> {

        this.schedulingTimeEntity = await this.schedulingTimeRepository.findBySchedulingDate(newScehdulingTime.schedulingBeginDate)

        logger.info("scheduling configuration to be create if not exist" + JSON.stringify(newScehdulingTime))
        if (!this.schedulingTimeEntity[0]) {
            return await this.schedulingTimeRepository.saveSchedulingTime(newScehdulingTime)
        }
    }

    protected initResult(): TimeSlotResult {
        return new TimeSlotResult();
    }

}