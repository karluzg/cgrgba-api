
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { TimeSlotParams } from "../../../application/model/scheduling-manager/TimeSlotParams";
import { TimeSlotResult } from "../../../application/model/scheduling-manager/TimeSlotResult";

import { injectable } from "tsyringe";;
import { ISchedulingTimeHourEngine } from "../ISchedulingTimeHourEngine";
import { AddNewTimeSlotOperation } from "../../operation/scheduling-manager/AddNewTimeSlotOperation";


@injectable()
export class SchedulingTimeHourEngineImpl extends GenericOperationTemplate implements ISchedulingTimeHourEngine {

    add_new_time_slot(params: TimeSlotParams): TimeSlotResult {
        return this.executeOperation(new AddNewTimeSlotOperation(), params)
    }


}
