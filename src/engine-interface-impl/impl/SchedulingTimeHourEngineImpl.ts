
import { GenericOperationTemplate } from "../operation/GenericOperationTemplate";
import { AddNewTimeSlotParams } from "../../engine-interface/params/scheduling-time/AddNewTimeSlotParams";
import { AddNewTimeSlotResult } from "../../engine-interface/result/scheduling-time/AddNewTimeSlotResult";
import { injectable } from "tsyringe";;
import { ISchedulingTimeHourEngine } from "../../engine-interface/services/ISchedulingTimeHourEngine";
import { AddNewTimeSlotOperation } from "../operation/backoffice/scheduling-time/AddNewTimeSlotOperation";


@injectable()
export class SchedulingTimeHourEngineImpl extends GenericOperationTemplate implements ISchedulingTimeHourEngine {

    add_new_time_slot(params: AddNewTimeSlotParams): AddNewTimeSlotResult {
        return this.executeOperation(new AddNewTimeSlotOperation(), params)
    }


}
