
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";
import { SchedulingPossibleStatus } from "../../../../domain/model/SchedulingPossibleStatus";
import { Scheduling } from "../../../../domain/model/Scheduling";

export class SchedulingResult extends ResultTemplate {

    private scheduling: Scheduling;
    private nextPossibleStatus: SchedulingPossibleStatus[]


    constructor() {
        super();
        this.getSuccessfullyMessage();
    }

    public get getScheduling(): Scheduling {
        return this.scheduling;
    }
    public set setScheduling(scheduling: Scheduling) {
        this.scheduling = scheduling;
    }

    public get getPossibleStatus(): SchedulingPossibleStatus[] {
        return this.nextPossibleStatus;
    }
    public set setPossibleStatus(possibleStatus: SchedulingPossibleStatus[]) {
        this.nextPossibleStatus = possibleStatus;
    }
}
