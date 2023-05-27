
import { injectable } from "tsyringe";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { TimeSlotParams } from "../../../application/model/scheduling-manager/schedulingTime/params/TimeSlotParams";
import { TimeSlotResult } from "../../../application/model/scheduling-manager/schedulingTime/TimeSlotResult";
import { ISchedulingTimeEngine } from "../ISchedulingTimeEngine";
import { AddNewTimeSlotOperation } from "../../operation/scheduling-manager/schedulingtime/AddNewTimeSlotOperation";
import { TimeSlotListParams } from "../../../application/model/scheduling-manager/schedulingTime/params/TimeSlotListParams";
import { GetTimeSlotListOperation } from "../../operation/scheduling-manager/schedulingtime/GetTimeSlotListOperation";



@injectable()
export class SchedulingTimeEngineImpl extends GenericOperationTemplate implements ISchedulingTimeEngine {

    async add_new_time_slot(params: TimeSlotParams): Promise<TimeSlotResult> {
        return await this.executeOperation(new AddNewTimeSlotOperation(), params)
    }

    get_time_slot_list(params: TimeSlotListParams): Promise<TimeSlotResult> {
        return this.executeOperation(new GetTimeSlotListOperation(), params);
    }

}
