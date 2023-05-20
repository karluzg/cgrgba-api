import { SchedulingHistory } from "../model/SchedulingHistory"

export interface ISchedulingHistoryEngineRepository {

    saveSchedulingHistory(schedulingHistory: SchedulingHistory): Promise<void>
    checkIfSchedulingHistoryExist(schedulingDate: string, chosenHour: string): Promise<boolean>
    countNumberOfSchedulingByDateandHour(schedulingDate: string, chosenHour: string): Promise<SchedulingHistory[]>
    blockDateAndHour(schedulingDate: string, chosenHour: string): Promise<void>


}     