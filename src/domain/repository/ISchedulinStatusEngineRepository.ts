import { SchedulingStatus } from "../model/SchedulingStatus";
import { SchedulingStatusEnum } from "../model/enum/SchedulingStatusEnum";

export interface ISchedulinStatusEngineRepository{
    findSchedulingStatus(schedulingStatusCode: SchedulingStatusEnum):Promise<SchedulingStatus>
}