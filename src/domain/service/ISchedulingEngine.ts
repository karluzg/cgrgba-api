import { AddNewSchedulingParams } from "../../application/model/scheduling-manager/scheduling/params/AddNewSchedulingParams";
import { SchedulingResult } from "../../application/model/scheduling-manager/scheduling/AddNewSchedulingResult";
import { GetSchedulingListResult } from "../../application/model/scheduling-manager/scheduling/GetSchedulingListResult";
import { GetSchedulingListParams } from "../../application/model/scheduling-manager/scheduling/params/GetSchedulingListParams";
import { SchedulingParams } from "../../application/model/scheduling-manager/scheduling/SchedulingParams";
import { SchedulingResult } from "../../application/model/scheduling-manager/scheduling/SchedulingResult";

export interface ISchedulingEngine{

    add_new_scheduling(params: AddNewSchedulingParams): Promise<SchedulingResult>;
    get_scheduling_list(params: GetSchedulingListParams): Promise<GetSchedulingListResult>

}