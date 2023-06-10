import { Scheduling } from "../../../model/Scheduling";
import { User } from "../../../model/User";

export class SchedulingResponseBuilder{
    public static  async buildSchedulingResponse(scheduling: Scheduling): Promise<Scheduling> {
        delete scheduling.enumOperationTemplate
        return scheduling;
    }
}