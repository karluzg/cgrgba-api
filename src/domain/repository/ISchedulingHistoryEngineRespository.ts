import { SchedulingHistory } from "../model/SchedulingHistory"

export interface ISchedulingHistoryEngineRepository {

    save(schedulingHistory: SchedulingHistory): Promise<void>
    checkIfSchedulingHistoryExist(schedulingDate: string, chosenHour: string): Promise<boolean>
    countNumberOfSchedulingByDateandHour(schedulingDate: string, chosenHour: string): Promise<SchedulingHistory[]>
    blockDateAndHour(schedulingDate: string, chosenHour: string): Promise<void>
    findSchedulingById(schedulingId: number): Promise<SchedulingHistory>


}     