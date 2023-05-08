import { TokenSession } from "../../../domain/model/TokenSession";
import { TimeSlotParams } from "../../../application/model/scheduling-manager/TimeSlotParams";
import { TimeSlotResult } from "../../../application/model/scheduling-manager/TimeSlotResult";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { container } from "tsyringe";
import { ISchedulingTimeEngineRepository } from "../../repository/ISchedulingTimeEngineRepository";
import { SchedulingTime } from "../../model/SchedulingTime";
import logger from "../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { SchedulingTimeUtil } from "../util/SchedulingTimeUtil";
import { ResultInfo } from "../../../infrestructure/response/ResultInfo";


export class AddNewTimeSlotOperation extends UserAuthOperationTemplate<TimeSlotResult, TimeSlotParams>{

    private schedulingTimeRepository: ISchedulingTimeEngineRepository;
    private schedulingTime: SchedulingTime;
    private dateList: Date[] = []

    constructor() {
        super(OperationNamesEnum.TIME_SLOT_ADD_CREATE, new OperationValidatorManager)
        this.schedulingTimeRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository")
    }

    protected async doValidateParameters(params: TimeSlotParams): Promise<void> {


        console.info("[AddNewTimeSlotOperation] init of strict validation scheduling time parameteres...")
        const schedulingDateInput = new Date(params.getBeginSchedulingDate)

        this.schedulingTime = await this.schedulingTimeRepository.findBySchedulingDate(schedulingDateInput)


        if (this.schedulingTime) {
            logger.error("[AddNewTimeSlotOperation] Scheduling time configuration already exist")
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_ALREADY_EXIST);
        }

        if (params.getAvailableCollaboratorNumber == 0) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER,
                MiddlewareBusinessMessage.SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER_MANDATORY)
        }


        const beginDate = new Date(params.getBeginSchedulingDate)
        const endDate = new Date(params.getEndSchedulingDate)
        const currentDate = new Date();


        if (endDate < beginDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_END_SCHEDULING_DATE_GREATHER_THAN_END_SCHEDULING_DATE)
        }

        if (beginDate <= currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_END_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE)
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

    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params:TimeSlotParams , result: TimeSlotResult) {

        let timeList: { [key: string]: string[] } = {};

        logger.info("[AddNewTimeSlotOperation] Begin generate hour list for each date...")

        timeList = await this.generateHourListByDate(params)

        const isTimeListEmpty = Object.keys(timeList).length === 0;
        if (isTimeListEmpty) {
            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_TIME_NOT_ADDED));
            result.setErrorMessages = Object.fromEntries(this.message)
        } else {

            this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SCHEDULING_TIME_ADDED));

            result.setErrorMessages = Object.fromEntries(this.message)

            result.setTimeList = timeList;
        }



    }

    async generateHourListByDate(params: TimeSlotParams): Promise<{ [key: string]: string[] }> {

        let timeList: { [key: string]: string[] } = {};

        await this.createDateList(params.getBeginSchedulingDate, params.getEndSchedulingDate)

        for (const inputDate of this.dateList) {


            console.log("[AddNewTimeSlotOperation] Check if input date is weekend %s", inputDate)

            const isWeekendResult = await this.isweekend(inputDate);

            console.log("[AddNewTimeSlotOperation] Input date chaecked.is weekend?", isWeekendResult)

            if (!isWeekendResult) {

                console.log("[AddNewTimeSlotOperation] input date is not weekend %s", inputDate)

                const year = inputDate.getFullYear();
                const month = inputDate.getMonth() + 1; // get month (Remember to add +1, why the months are based  in month)
                const day = inputDate.getDate();


                const beginWorkDateTime = new Date(`${year}-${month}-${day}  ${params.getBeginWorkTime} `);

                let endBegingWorkDateTime = new Date(`${year}-${month}-${day}  ${params.getBeginWorkTime} `);

                if (params.getEndSchedulingDate.length == 0) {

                    logger.info("[AddNewTimeSlotOperation] Scheduling configuration without interval of date. Use just beginSchedulingDate to generate hour list")

                    endBegingWorkDateTime = new Date(`${year}-${month}-${day}  ${params.getBeginWorkTime} `);
                } else {
                    logger.info("[AddNewTimeSlotOperation] Scheduling configuration with interval of date. Use beginSchedulingDate and endSchedulingDate to generate hour list")

                    endBegingWorkDateTime = new Date(`${year}-${month}-${day}  ${params.getEndWorkTime} `);
                }

                const hourlist = await this.createSchedulingTimeByDate(inputDate, beginWorkDateTime, endBegingWorkDateTime, params);

                logger.info("Hour list returned", hourlist)
                const dateKey = `${year}-${month}-${day}`;

                logger.info("Date key String builded to add to time list", dateKey)
                timeList[dateKey] = hourlist;


            }
            logger.info("[AddNewTimeSlotOperation] input date is weekend", inputDate)
        }

        return timeList
    }

    async createDateList(begingSchedulingDateInput: string, endSchdulingDateInput: string): Promise<void> {

        const beginSchedulingDateConverted = new Date(begingSchedulingDateInput)
        const endSchedulingDateConverted = new Date(endSchdulingDateInput)

        while (beginSchedulingDateConverted <= endSchedulingDateConverted) {
            this.dateList.push(new Date(beginSchedulingDateConverted))
            beginSchedulingDateConverted.setDate(beginSchedulingDateConverted.getDate() + 1); // update beginSchedulingDateConverted adding +1 day
        }

    }


    async isweekend(inputDate: Date): Promise<boolean> {
        const dayWeek = inputDate.getDay();
        return dayWeek === 0 || dayWeek === 6; // 0 = Sunday and 6 = saturday
    }

    async createSchedulingTimeByDate(inputDate: Date, beginWorkDateTime: Date, endWorkDateTime: Date, params: TimeSlotParams): Promise<string[]> {

        const hourList: string[] = [];

        let schedulingTimeTobeSave = await this.initCreateScheduling(inputDate, params)

        logger.info("[AddNewTimeSlotOperation] beginWorkDateTime received:", beginWorkDateTime)
        logger.info("[AddNewTimeSlotOperation] endWorkDateTime received:", endWorkDateTime)

        while (beginWorkDateTime <= endWorkDateTime && beginWorkDateTime.toDateString() === inputDate.toDateString()) {
            const hour = beginWorkDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            hourList.push(hour)
            beginWorkDateTime.setMinutes(beginWorkDateTime.getMinutes() + params.getServiceInterval); // update beginWorkDateTime adding service interval
        }

        schedulingTimeTobeSave.hours = hourList;
        await this.saveSchedulingTime(schedulingTimeTobeSave)
        return hourList

    }

    async initCreateScheduling(inputDate: Date, params: TimeSlotParams): Promise<SchedulingTime> {

        const newSchedulingTime = new SchedulingTime();

        newSchedulingTime.schedulingBeginDate = inputDate;

        newSchedulingTime.beginLunchTime = params.getBeginLunchTime;

        newSchedulingTime.endLunchTime = params.getBeginLunchTime;

        newSchedulingTime.serviceInterval = params.getServiceInterval;

        newSchedulingTime.availableCollaboratorNumber = params.getAvailableCollaboratorNumber;

        return newSchedulingTime;

    }


    async saveSchedulingTime(newScehdulingTime: SchedulingTime): Promise<SchedulingTime> {

        this.schedulingTime = await this.schedulingTimeRepository.findBySchedulingDate(newScehdulingTime.schedulingBeginDate)

        if (!this.schedulingTime) {
            return await this.schedulingTimeRepository.saveSchedulingTime(newScehdulingTime)
        }
    }

    protected initResult(): TimeSlotResult {
        return new TimeSlotResult();
    }

}