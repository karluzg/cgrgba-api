import { AddNewSchedulingParams } from "../../application/model/scheduling-manager/scheduling/AddNewSchedulingParams";
import { SchedulingResult } from "../../application/model/scheduling-manager/scheduling/AddNewSchedulingResult";

export interface ISchedulingEngine{

    add_new_scheduling(params: AddNewSchedulingParams): Promise<SchedulingResult>;

}