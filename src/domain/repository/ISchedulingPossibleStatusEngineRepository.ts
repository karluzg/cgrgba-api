import { SchedulingPossibleStatus } from "../model/SchedulingPossibleStatus";

export interface ISchedulingPossibleStatusEngineRepository {

    findSchedulingNextStatus(schedulingCurrentStatus: string): Promise<SchedulingPossibleStatus[]>
}

