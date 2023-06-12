import { SchedulingStatusEnum } from "../../../../../domain/model/enum/SchedulingStatusEnum";
import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";

export class ChangeSchedulingStatusParams extends AuthParamsTemplate {

    private readonly schedulingId: number
    private readonly schedulingStatusCode: SchedulingStatusEnum
    constructor(authentication: string, schedulingId: number,
        schedulingStatusCode: SchedulingStatusEnum) {
        super(authentication);
        this.schedulingId = schedulingId
        this.schedulingStatusCode = schedulingStatusCode
    }

    get getSchedulingId(): number {
        return this.schedulingId;
    }
    get getSchedulingStatusCode(): SchedulingStatusEnum {
        return this.schedulingStatusCode;
    }
}