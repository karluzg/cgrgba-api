import { AddTimeSlotParams } from "../../application/model/scheduling-manager/params/AddTimeSlotParams";
import { GetTimeSlotListParams } from "../../application/model/scheduling-manager/params/GetTimeSlotListParams";
import { TimeSlotResult } from "../../application/model/scheduling-manager/TimeSlotResult";


export interface ISchedulingTimeEngine {

    add_new_time_slot(params: AddTimeSlotParams): Promise<TimeSlotResult>;
    get_time_slot_list(params: GetTimeSlotListParams): Promise<TimeSlotResult>;

}