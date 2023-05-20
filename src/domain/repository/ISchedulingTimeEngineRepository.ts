
import { SchedulingTimeConfiguration } from "../model/SchedulingTimeConfiguration";

export interface ISchedulingTimeEngineRepository {
    findBySchedulingDate(beginDate: Date): Promise<SchedulingTimeConfiguration[]>
    saveSchedulingTime(schedulingTime: SchedulingTimeConfiguration): Promise<SchedulingTimeConfiguration>


}