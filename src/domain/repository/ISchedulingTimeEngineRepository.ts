import { SchedulingTime } from "../model/SchedulingTime";

export interface ISchedulingTimeEngineRepository {
    findBySchedulingDate(schedulingBeginDate: Date): Promise<SchedulingTime>
    saveSchedulingTime(schedulingTime: SchedulingTime): Promise<SchedulingTime>

}