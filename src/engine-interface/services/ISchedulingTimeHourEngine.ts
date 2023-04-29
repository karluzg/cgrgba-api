import { AddNewTimeSlotParams } from "../params/scheduling-time/AddNewTimeSlotParams";
import { AddNewTimeSlotResult } from "../result/scheduling-time/AddNewTimeSlotResult";

export interface ISchedulingTimeHourEngine {

    add_new_time_slot(params: AddNewTimeSlotParams): AddNewTimeSlotResult;

}