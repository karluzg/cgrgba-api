
import { GetSchedulingListResult } from "../../application/model/scheduling-manager/scheduling/GetSchedulingListResult";
import { ChangeSchedulingStatusParams } from "../../application/model/scheduling-manager/scheduling/params/ChangeSchedulingStatusParams";
import { GetSchedulingDetailParams } from "../../application/model/scheduling-manager/scheduling/params/GetSchedulingDetailParams";
import { GetSchedulingListParams } from "../../application/model/scheduling-manager/scheduling/params/GetSchedulingListParams";
import { UpdateSchedulingParams } from "../../application/model/scheduling-manager/scheduling/params/UpdateSchedulingParams";
import { SchedulingParams } from "../../application/model/scheduling-manager/scheduling/SchedulingParams";
import { SchedulingResult } from "../../application/model/scheduling-manager/scheduling/SchedulingResult";

export interface ISchedulingEngine{

    add_new_scheduling(params: SchedulingParams): Promise<SchedulingResult>;
    get_scheduling_list(params: GetSchedulingListParams): Promise<GetSchedulingListResult>
    get_scheduling_detail(params: GetSchedulingDetailParams): Promise<SchedulingResult>
    update_scheduling(params: UpdateSchedulingParams): Promise<SchedulingResult>
    change_scheduling_status(params: ChangeSchedulingStatusParams): Promise<SchedulingResult>

}