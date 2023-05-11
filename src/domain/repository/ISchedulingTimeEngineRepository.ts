
import { SchedulingTimeConfiguration } from "../model/SchedulingTimeConfiguration";

export interface ISchedulingTimeEngineRepository {
    findBySchedulingDate(schedulingBeginDate: Date): Promise<SchedulingTimeConfiguration>
    saveSchedulingTime(schedulingTime: SchedulingTimeConfiguration): Promise<SchedulingTimeConfiguration>


}