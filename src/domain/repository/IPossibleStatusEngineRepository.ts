import { SchedulingStatus } from "../model/SchedulingStatus";

export interface IPossibleStatusEngineRepository {
    findNextStatus(StatusschedulingStatus: SchedulingStatus): Promise<SchedulingStatus[]>
}