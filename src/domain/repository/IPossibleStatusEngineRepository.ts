import { SchedulingStatus } from "../model/SchedulingStatus";

export interface ISchedulingPossibleStatusEngineRepository {
    findNextStatus(StatusschedulingStatus: SchedulingStatus): Promise<SchedulingStatus[]>
}