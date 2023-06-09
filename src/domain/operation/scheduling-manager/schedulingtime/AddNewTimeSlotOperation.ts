import { TokenSession } from "../../../model/TokenSession";
import { TimeSlotParams } from "../../../../application/model/scheduling-manager/schedulingTime/params/TimeSlotParams";
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
import { TimeUtil } from "../../util/TimeUtil";
import { IHollydayEngineRepository as IHollydayEngineRepository } from "../../../repository/IHollydayEngineRepository";
import { Hour } from "../../../model/Hour";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";



export class AddNewTimeSlotOperation extends UserAuthOperationTemplate<TimeSlotResult, TimeSlotParams>{

    private readonly schedulingTimeRepository: ISchedulingTimeEngineRepository;
    private readonly hollydayEngineRepository: IHollydayEngineRepository;

    private schedulingTimeEntity: SchedulingTimeConfiguration[] = [];
    private dateList: Date[] = [];
    private endSchedulingDate: string;


    constructor() {
        super(OperationNamesEnum.TIMESLOT_CREATE, OperationValidatorManager.getSingletonInstance())
        this.schedulingTimeRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository")
        this.hollydayEngineRepository = container.resolve<IHollydayEngineRepository>("IHollydayEngineRepository")
    }

    protected async doValidateParameters(params: TimeSlotParams): Promise<void> {


        logger.info("[AddNewTimeSlotOperation] Begin of strict validation scheduling time parameteres...")

        const schedulingDateInput = new Date(params.getBeginSchedulingDate);


        this.schedulingTimeEntity = await this.schedulingTimeRepository.findBySchedulingDate(schedulingDateInput)

        logger.info("[AddNewTimeSlotOperation] schedulingTime entity founded %", this.schedulingTimeEntity.length)


        if (this.schedulingTimeEntity.length > 0) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_ALREADY_EXIST);
        }


        const isBeginDateIsnullOrEmpty: boolean = typeof params.getEndSchedulingDate !== 'undefined' && params.getEndSchedulingDate !== ''

        if (isBeginDateIsnullOrEmpty) {

            this.endSchedulingDate = params.getEndSchedulingDate;

        } else {
            this.endSchedulingDate = params.getBeginSchedulingDate;

        }


        logger.info("[AddNewTimeSlotOperation] Validate available collaborator number")
        if (params.getAvailableCollaboratorNumber == 0) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER,
                MiddlewareBusinessMessage.SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER_MANDATORY)
        }


        const isWeekendBeginDate = await TimeUtil.isweekend(new Date(params.getBeginSchedulingDate));
        const isWeekendEndate = await TimeUtil.isweekend(new Date(this.endSchedulingDate));

        if (isWeekendBeginDate) {

            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_WEEKEND_BEGIN_DATE)
        }

        if (isWeekendEndate) {

            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_WEEKEND_END_DATE)
        }

        const isHollydaybeginDate = await TimeUtil.isHollyDay(new Date(params.getBeginSchedulingDate),
            this.hollydayEngineRepository, "[AddNewTimeSlotOperation]")
        
        const isHollydayEndDate = await TimeUtil.isHollyDay(new Date(this.endSchedulingDate),
            this.hollydayEngineRepository, "[AddNewTimeSlotOperation]")

        if (isHollydaybeginDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_HOLLYDAY_BEGIN_DATE)
        }

        if (isHollydayEndDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_HOLLYDAY_END_DATE)
        }


            // Begin, end and current date

        const beginDate = new Date(params.getBeginSchedulingDate)
        const currentDate = new Date()
        const endDate = new Date(this.endSchedulingDate)

        logger.info("[AddNewTimeSlotOperation] Scheduling Begin Date %s", beginDate)
        logger.info("[AddNewTimeSlotOperation] Scheduling End Date %s", endDate)
        logger.info("[AddNewTimeSlotOperation] Current Date %s", currentDate)

        if (endDate < beginDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_END_SCHEDULING_DATE_GREATHER_THAN_EQUAL_BEGIN_SCHEDULING_DATE)
        }

        if (beginDate <= currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_AFTER_CURRENT_DATE)
        }


        // Begin and End Work Time
        const beginWorkTime = await TimeUtil.getTimePart(params.getBeginWorkTime)
        const endWorkTime = await TimeUtil.getTimePart(params.getEndWorkTime)


        const beginWorkMinute = await TimeUtil.getMinutePart(params.getBeginWorkTime);
        const endWorkMinute = await TimeUtil.getMinutePart(params.getEndWorkTime);



        if ((endWorkTime < beginWorkTime) || (beginWorkTime == endWorkTime && endWorkMinute < beginWorkMinute)) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_WORK_TIME,
                MiddlewareBusinessMessage.SCHEDULING_TIME_END_WORK_TIME_GREATER_THAN_BEGIN_WORK_TIME)
        }


        // Begin and End lunch Time
        const beginLunchTime = await TimeUtil.getTimePart(params.getBeginLunchTime)
        const endLunchTime = await TimeUtil.getTimePart(params.getEndLunchTime)

        const beginLunchkMinute = await TimeUtil.getMinutePart(params.getBeginLunchTime);
        const endLunchMinute = await TimeUtil.getMinutePart(params.getEndLunchTime);


        if ((endLunchTime <= beginLunchTime) || (beginLunchTime == endLunchTime && endLunchMinute < beginLunchkMinute)) {
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
        if (endLunchTime >= endWorkTime) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_END_LUNCH_TIME,
                MiddlewareBusinessMessage.SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_BEGIN_WORK_TIME)

        }

        logger.info("[GetTimeSlotListOperation] End of strict validation scheduling time parameteres...")

    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: TimeSlotParams, result: TimeSlotResult) {


        logger.info("[AddNewTimeSlotOperation] Begin generate hour list for each date...")

        await this.generateHourListBySchedulingDate(params, this.hollydayEngineRepository);


    }

    async generateHourListBySchedulingDate(params: TimeSlotParams, hollydayRepository: IHollydayEngineRepository): Promise<void> {


        logger.info("[AddNewTimeSlotOperation] Generate List by scheduling date received params:" + params)

        await this.createSchedulingDateList(params.getBeginSchedulingDate, this.endSchedulingDate)

        logger.info("[AddNewTimeSlotOperation] Date list returned:" + this.dateList)

        for (const inputDate of this.dateList) {

            const isWeekend = await TimeUtil.isweekend(inputDate);

            const isHollyday = await TimeUtil.isHollyDay(inputDate, hollydayRepository, "[AddNewTimeSlotOperation]")


            if (!isWeekend && !isHollyday) {

                const dateWithoutHour = await TimeUtil.getDateWithoutTime(inputDate)

                const beginWorkDateTime = new Date(`${dateWithoutHour} ${params.getBeginWorkTime} `);

                let endBegingWorkDateTime = new Date(`${dateWithoutHour}  ${params.getEndWorkTime} `);
               
                /*if (params.getEndSchedulingDate.length == 0) {
                    endBegingWorkDateTime = new Date(`${dateWithoutHour} ${params.getBeginWorkTime} `);

                } else {

                    endBegingWorkDateTime = new Date(`${dateWithoutHour} ${params.getEndWorkTime} `);
                }*/

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
            beginSchedulingDateConverted.setDate(beginSchedulingDateConverted.getDate() + 1); // update beginSchedulingDateConverted adding 1+ day
        }

    }

    async createSchedulingTimeBySchedulingDate(inputDate: Date, beginWorkDateTime: Date, endWorkDateTime: Date, params: TimeSlotParams): Promise<void> {
        const hourList: string[] = [];
        
        logger.info("[AddNewTimeSlotOperation] beginWorkDateTime received %s", beginWorkDateTime);
        logger.info("[AddNewTimeSlotOperation] endWorkDateTime received %s", endWorkDateTime);
    
        const maxTimeBeforeEnd = new Date(endWorkDateTime.getTime() - (90 * 60000)); // Subtract 90 minutes from endWorkDateTime
    
        while (beginWorkDateTime <= maxTimeBeforeEnd && beginWorkDateTime.toDateString() === inputDate.toDateString()) {
            const hour = beginWorkDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            hourList.push(hour);
    
            beginWorkDateTime.setMinutes(beginWorkDateTime.getMinutes() + params.getServiceInterval); // Update beginWorkDateTime by adding the service interval
    
            // Check if the next hour exceeds the maxTimeBeforeEnd
            const nextHour = new Date(beginWorkDateTime.getTime() + (params.getServiceInterval * 60000));
    
            if (nextHour > maxTimeBeforeEnd) {
                // Add the maxTimeBeforeEnd hour
                const maxTimeBeforeEndHour = maxTimeBeforeEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                hourList.push(maxTimeBeforeEndHour);
                break;
            }
        }
    
        logger.info("[AddNewTimeSlotOperation] InputDate to be Added %s and hour list %s", inputDate, hourList);
        await this.createNewSchedulingConfiguration(inputDate, params, hourList);
    }
    
    

    async createNewSchedulingConfiguration(inputDate: Date, params: TimeSlotParams, hourlistInput: string[]): Promise<void> {
        const newSchedulingTime = new SchedulingTimeConfiguration();

        newSchedulingTime.creationDate = new Date();
        newSchedulingTime.beginDate = inputDate;
        newSchedulingTime.beginWorkTime = params.getBeginWorkTime;
        newSchedulingTime.endWorkTime = params.getEndWorkTime;
        newSchedulingTime.beginLunchTime = params.getBeginLunchTime;
        newSchedulingTime.endLunchTime = params.getEndLunchTime;
        newSchedulingTime.serviceInterval = params.getServiceInterval;
        newSchedulingTime.availableCollaboratorNumber = params.getAvailableCollaboratorNumber;

        const hours: Hour[] = hourlistInput.map(value => {
            const hour = new Hour();
            hour.value = value;
            return hour;
        });

        newSchedulingTime.hours = hours;

        newSchedulingTime.hours.slice(0, -2)

        await this.saveSchedulingTime(newSchedulingTime);
    }



    async saveSchedulingTime(newScehdulingTime: SchedulingTimeConfiguration): Promise<SchedulingTimeConfiguration> {

        this.schedulingTimeEntity = await this.schedulingTimeRepository.findBySchedulingDate(newScehdulingTime.beginDate)

        logger.info("scheduling configuration to be create if not exist" + JSON.stringify(newScehdulingTime))

            return await this.schedulingTimeRepository.saveSchedulingTime(newScehdulingTime)

    }

    protected initResult(): TimeSlotResult {
        return new TimeSlotResult();
    }

}