
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";
import { SchedulingPossibleStatus } from "../../../../domain/model/SchedulingPossibleStatus";
import { SchedulingResponse } from "../../../../domain/operation/response-builder/scheduling-manager/SchedulingResponse";

export class SchedulingResult extends ResultTemplate {

    private scheduling: SchedulingResponse;

    constructor() {
        super();
        this.getSuccessfullyMessage();
    }

    private nextPossibleStatus: SchedulingPossibleStatus[]

    public get getScheduling(): SchedulingResponse {
        return this.scheduling;
    }
    public set setScheduling(scheduling: SchedulingResponse) {
        this.scheduling = scheduling;
    }

    public get getPossibleStatus(): SchedulingPossibleStatus[] {
        return this.nextPossibleStatus;
    }
    public set setPossibleStatus(possibleStatus: SchedulingPossibleStatus[]) {
        this.nextPossibleStatus = possibleStatus;
    }

}
