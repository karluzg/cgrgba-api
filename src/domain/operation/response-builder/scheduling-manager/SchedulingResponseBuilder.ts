import { Scheduling } from "../../../model/Scheduling";
import { User } from "../../../model/User";

export class SchedulingResponseBuilder{
    public static  async buildSchedulingResponse(scheduling: Scheduling): Promise<Scheduling> {
        delete scheduling.enumOperationTemplate;
        delete scheduling.year;
        delete scheduling.month;
        delete scheduling.day;

        if (scheduling.updateBy) {
            delete scheduling.updateBy.enumOperationTemplate;
            delete scheduling.updateBy.passwordHash;
            delete scheduling.updateBy.passwordSalt;
            delete scheduling.updateBy.passwordTry;
        }

        if (scheduling.attendBy) {
            delete scheduling.attendBy.enumOperationTemplate;
            delete scheduling.attendBy.passwordHash;
            delete scheduling.attendBy.passwordSalt;
            delete scheduling.attendBy.passwordTry;
        }


        return scheduling;
    }
}