import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { Scheduling } from "../../../../domain/model/Scheduling";
import { SchedulingStatus } from "../../../../domain/model/SchedulingStatus";
import { User } from "../../../../domain/model/User";
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";

export class SchedulingResult extends ResultTemplate {
    @IsObject()
    @ValidateNested()
    @Type(() => Scheduling)
    private scheduling: Scheduling;
    @IsObject()
    @ValidateNested()
    @Type(() => SchedulingStatus)
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
