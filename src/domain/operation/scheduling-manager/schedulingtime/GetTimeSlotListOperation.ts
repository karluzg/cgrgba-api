import { container } from "tsyringe";
import { TimeSlotResult } from "../../../../application/model/scheduling-manager/schedulingTime/TimeSlotResult";
import { TimeSlotListParams } from "../../../../application/model/scheduling-manager/schedulingTime/params/TimeSlotListParams";

import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { SchedulingTimeConfiguration } from "../../../model/SchedulingTimeConfiguration";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { ISchedulingTimeEngineRepository } from "../../../repository/ISchedulingTimeEngineRepository";
import { SchedulingTimeUtil } from "../../util/SchedulingTimeUtil";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { IHollydayEngineRepository } from "../../../repository/IHollydayEngineRepository";
import { ISchedulingHistoryEngineRepository } from "../../../repository/ISchedulingHistoryEngineRespository";
import logger from "../../../../infrestructure/config/logger";


export class GetTimeSlotListOperation extends UserAuthOperationTemplate<TimeSlotResult, TimeSlotListParams>{

    private readonly schedulingTimeRepository: ISchedulingTimeEngineRepository;
    private readonly hollydayRepository: IHollydayEngineRepository;
    private readonly schedulingHistoryEngineRepository: ISchedulingHistoryEngineRepository;
    private schedulingTimeEntity: SchedulingTimeConfiguration;

    private schedulingDateInput: Date


    constructor() {
        super(OperationNamesEnum.TIMESLOT_GET_LIST, OperationValidatorManager.getSingletonInstance())
        this.schedulingTimeRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository")
        this.hollydayRepository = container.resolve<IHollydayEngineRepository>("IHollydayEngineRepository")
        this.schedulingHistoryEngineRepository = container.resolve<ISchedulingHistoryEngineRepository>("ISchedulingHistoryEngineRepository")
    }

    protected async doValidateParameters(params: TimeSlotListParams): Promise<void> {

        logger.info("[GetTimeSlotListOperation] Begin strict validation scheduling time parameteres...")

        const beginDate = new Date(params.getBeginSchedulingDate)
        const currentDate = new Date();

        if (beginDate < currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST)
        }


        this.schedulingDateInput = new Date(params.getBeginSchedulingDate);

        logger.info("[GetTimeSlotListOperation] schedulingDateinput converted %s", this.schedulingDateInput)

        const isWeekend = await SchedulingTimeUtil.isweekend(this.schedulingDateInput);

        const isHollyday = await SchedulingTimeUtil.isHollyDay(this.schedulingDateInput, this.hollydayRepository, "[GetTimeSlotListOperation]")


        if (isWeekend || isHollyday) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }

        this.schedulingTimeEntity = await this.schedulingTimeRepository.findBySchedulingDate(this.schedulingDateInput)

        logger.info("[AddNewTimeSlotOperation] schedulingTime entity founded %", this.schedulingTimeEntity)

        if (!this.schedulingTimeEntity[0]) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST);
        }

        logger.info("[GetTimeSlotListOperation] End of strict validation scheduling time parameteres...")
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: TimeSlotListParams, result: TimeSlotResult): Promise<void> {


        logger.info("[AddNewTimeSlotOperation][doUserAuthExecuted] Begin building available hour list");

        const hourList = this.schedulingTimeEntity[0].hours;
        const availableCollaboratorNumber = this.schedulingTimeEntity[0].availableCollaboratorNumber;

        const hourlist = await this.buildAvailableHourList(hourList, availableCollaboratorNumber, params.getBeginSchedulingDate)
        result.setTimeList = hourlist;

    }

    private async buildAvailableHourList(hourListinput: string[], availableCollaboratorNumber: number, schedulingDate: string): Promise<string[]> {

        logger.info("[AddNewTimeSlotOperation][buildAvailableHourList] Watching scheduling hours retrieved:", hourListinput);

        logger.info("[AddNewTimeSlotOperation][buildAvailableHourList] Watching available collaborator number received:", availableCollaboratorNumber);

        const hourListoutPut: string[] = [];

        for (const hour of hourListinput) {
            const isDateAndHourAvailable = await this.schedulingHistoryEngineRepository.checkIfSchedulingHistoryExist(schedulingDate, hour);

            if (!isDateAndHourAvailable) {
                hourListoutPut.push(hour);
            }
        }

        logger.info("[GetTimeSlotListOperation] Available hour list returned:", hourListoutPut);

        return hourListoutPut;

    }

    protected initResult(): TimeSlotResult {
        return new TimeSlotResult();
    }

}