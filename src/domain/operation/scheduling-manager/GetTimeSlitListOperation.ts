import { container } from "tsyringe";
import { TimeSlotResult } from "../../../application/model/scheduling-manager/TimeSlotResult";
import { GetTimeSlotListParams } from "../../../application/model/scheduling-manager/params/GetTimeSlotListParams";

import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { SchedulingTime } from "../../model/SchedulingTime";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { ISchedulingTimeEngineRepository } from "../../repository/ISchedulingTimeEngineRepository";
import logger from "../../../infrestructure/config/logger";
import { SchedulingTimeUtil } from "../util/SchedulingTimeUtil";

export class GetTimeSlitListOperation extends UserAuthOperationTemplate<TimeSlotResult, GetTimeSlotListParams>{

    private schedulingTimeRepository: ISchedulingTimeEngineRepository;
    private dateList: Date[] = []


    constructor() {
        super(OperationNamesEnum.TIME_SLOT_GET_LIST, new OperationValidatorManager)
        this.schedulingTimeRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository")
    }



    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetTimeSlotListParams, result: TimeSlotResult): Promise<void> {



        const schedulingDateInput = await SchedulingTimeUtil.getDateConverted(params.getBeginSchedulingDate)
        const schedulingTime = await this.schedulingTimeRepository.findBySchedulingDate(schedulingDateInput)

        if (schedulingTime) {
            logger.info("[GetTimeSlitListOperation] There is no scheduling time input params. lista at least 5 results")



        } else {
            logger.info("[GetTimeSlitListOperation] scheduling time founded for date %", schedulingTime.schedulingBeginDate)
        }


    }
    protected initResult(): TimeSlotResult {
        throw new Error("Method not implemented.");
    }



}