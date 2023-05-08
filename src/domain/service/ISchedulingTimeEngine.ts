import { TimeSlotParams } from "../../application/model/scheduling-manager/TimeSlotParams";
import { TimeSlotResult } from "../../application/model/scheduling-manager/TimeSlotResult";


export interface ISchedulingTimeEngine {

    add_new_time_slot(params: TimeSlotParams): Promise<TimeSlotResult>;

}