import { container } from "tsyringe";
import { TimeSlotResult } from "../../../../application/model/scheduling-manager/schedulingTime/TimeSlotResult";
import { GetTimeSlotListParams } from "../../../../application/model/scheduling-manager/schedulingTime/params/GetTimeSlotListParams";

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


export class GetTimeSlotListOperation extends UserAuthOperationTemplate<TimeSlotResult, GetTimeSlotListParams>{

    private schedulingTimeRepository: ISchedulingTimeEngineRepository;
    private hollydayRepository: IHollydayEngineRepository;
    private schedulingHistoryEngineRepository: ISchedulingHistoryEngineRepository;
    private schedulingTimeEntity: SchedulingTimeConfiguration;

    private schedulingDateInput: Date


    constructor() {
        super(OperationNamesEnum.TIME_SLOT_GET_LIST, new OperationValidatorManager)
        this.schedulingTimeRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository")
        this.hollydayRepository = container.resolve<IHollydayEngineRepository>("IHollydayEngineRepository")
        this.schedulingHistoryEngineRepository = container.resolve<ISchedulingHistoryEngineRepository>("ISchedulingHistoryEngineRepository")
    }

    protected async doValidateParameters(params: GetTimeSlotListParams): Promise<void> {

        logger.info("[GetTimeSlotListOperation] Begin strict validation scheduling time parameteres...")

        const beginDate = new Date(params.getBeginSchedulingDate)
        const dateWithoutHour = await SchedulingTimeUtil.getDateWithoutHour(new Date())
        const currentDate = new Date(dateWithoutHour);

        if (beginDate < currentDate) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE,
                MiddlewareBusinessMessage.SCHEDULING_TIME_BEGIN_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE)
        }


        this.schedulingDateInput = new Date(params.getBeginSchedulingDate);

        logger.info("[GetTimeSlotListOperation] schedulingDateinput converted %s", this.schedulingDateInput)

        const isWeekend = await SchedulingTimeUtil.isweekend(this.schedulingDateInput);

        const isHollyday = await SchedulingTimeUtil.isHollyDay(this.schedulingDateInput, this.hollydayRepository, "[GetTimeSlotListOperation]")


        if (isWeekend || isHollyday) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_CONFIG_NOT_EXIST);
        }

        this.schedulingTimeEntity = await this.schedulingTimeRepository.findBySchedulingDate(this.schedulingDateInput)

        logger.info("[AddNewTimeSlotOperation] schedulingTime entity founded %", this.schedulingTimeEntity)

        if (!this.schedulingTimeEntity[0]) {
            throw new InvalidParametersException(Field.SCHEDULING_TIME_DATE, MiddlewareBusinessMessage.SCHEDULING_TIME_CONFIG_NOT_EXIST);
        }

        logger.info("[GetTimeSlotListOperation] End of strict validation scheduling time parameteres...")
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetTimeSlotListParams, result: TimeSlotResult): Promise<void> {


        logger.info("[AddNewTimeSlotOperation][doUserAuthExecuted] Begin building available hour list");

        const hourList = this.schedulingTimeEntity[0].hours;
        const availableCollaboratorNumber = this.schedulingTimeEntity[0].availableCollaboratorNumber;

        const hourlist = await this.buildAvailableHourList(hourList, availableCollaboratorNumber, params.getBeginSchedulingDate)
        result.setTimeList = hourlist;

    }

    private async buildAvailableHourList(hourListinput: string[], availableCollaboratorNumber: number, schedulingDate: string): Promise<string[]> {


        logger.info("[AddNewTimeSlotOperation][buildAvailableHourList] watch scheduling hours retrieved:" + hourListinput);
        logger.info("[AddNewTimeSlotOperation][buildAvailableHourList] watch available collaborator number received:" + availableCollaboratorNumber);

        let hourListoutPut: string[] = [];

        for (let start = 0; start < hourListinput.length; start++) {

            let hour = hourListinput[start]

            const isDateAndHourAvailable = await this.schedulingHistoryEngineRepository.checkIfSchedulingHistoryExist(schedulingDate, hour)

            if (!isDateAndHourAvailable) {

                hourListoutPut.push(hour)
            }

        }

        logger.info("[GetTimeSlotListOperation] Available hour list returned:" + hourListoutPut)

        return hourListoutPut;
    }

    protected initResult(): TimeSlotResult {
        return new TimeSlotResult();
    }



}