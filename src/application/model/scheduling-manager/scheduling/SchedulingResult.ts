import { Scheduling } from "../../../../domain/model/Scheduling";
import { SchedulingStatus } from "../../../../domain/model/SchedulingStatus";
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";

export class SchedulingResult extends ResultTemplate {


    private scheduling: Scheduling;
    private possibleStatus: SchedulingStatus[]

    public get getScheduling(): Scheduling {
        return this.scheduling;
    }
    public set setScheduling(scheduling: Scheduling) {
        this.scheduling = scheduling;
    }

    public get getPossibleStatus(): SchedulingStatus[] {
        return this.possibleStatus;
    }
    public set setPossibleStatus(possibleStatus: SchedulingStatus[]) {
        this.possibleStatus = possibleStatus;
    }


}
