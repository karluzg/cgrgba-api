import { TimeSlotParams } from "../../application/model/scheduling-manager/TimeSlotParams";
import { TimeSlotResult } from "../../application/model/scheduling-manager/TimeSlotResult";


export interface ISchedulingTimeHourEngine {

    add_new_time_slot(params: TimeSlotParams): TimeSlotResult;

}