import { Scheduling } from "../../../../domain/model/Scheduling";
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";

export class SchedulingResult extends ResultTemplate {


    private scheduling: Scheduling;

    public get getScheduling(): Scheduling {
        return this.scheduling;
    }
    public set setScheduling(scheduling: Scheduling) {
        this.scheduling = scheduling;
    }
}
