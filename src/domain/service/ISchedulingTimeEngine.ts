import { TimeSlotParams } from "../../application/model/scheduling-manager/schedulingTime/params/TimeSlotParams";
import { TimeSlotListParams } from "../../application/model/scheduling-manager/schedulingTime/params/TimeSlotListParams";
import { TimeSlotResult } from "../../application/model/scheduling-manager/schedulingTime/TimeSlotResult";


export interface ISchedulingTimeEngine {

    add_new_time_slot(params: TimeSlotParams): Promise<TimeSlotResult>;
    get_time_slot_list(params: TimeSlotListParams): Promise<TimeSlotResult>;

}