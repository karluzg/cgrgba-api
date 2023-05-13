import { SchedulingParams } from "../../application/model/scheduling-manager/scheduling/SchedulingParams";
import { SchedulingResult } from "../../application/model/scheduling-manager/scheduling/SchedulingResult";

export interface ISchedulingEngine{

    add_new_scheduling(params: SchedulingParams): Promise<SchedulingResult>;

}