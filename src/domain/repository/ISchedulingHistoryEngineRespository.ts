import { SchedulingHistory } from "../model/SchedulingHistory"

export interface ISchedulingHistoryEngineRepository {

    save(schedulingHistory: SchedulingHistory): Promise<void>
    checkIfSchedulingHistoryExist(schedulingDate: string, chosenHour: string): Promise<boolean>
    findSchedulingById(schedulingId: number): Promise<SchedulingHistory>



}     