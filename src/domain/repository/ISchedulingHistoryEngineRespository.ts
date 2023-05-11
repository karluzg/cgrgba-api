import { SchedulingHistory } from "../model/SchedulingHistory"

export interface ISchedulingHistoryEngineRepository {

    saveSchedulingHistory(schedulingHistory: SchedulingHistory): Promise<void>
    checkIfSchedulingHistoryExist(schedulingDate: string, chosenHour: string): Promise<boolean>
    countNumberOfSchedulingByDateandHour(schedulingDate: string, chosenHour: string): Promise<SchedulingHistory[]>
    updateSchedulingHistory(schedulingHistory: SchedulingHistory): Promise<void>


}     