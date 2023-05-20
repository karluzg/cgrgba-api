import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";

export class GetSchedulingDetailParams extends AuthParamsTemplate {

    private readonly schedulingId: number
    constructor(authentication: string, schedulingId: number) {
        super(authentication);
        this.schedulingId = schedulingId
    }

    get getSchedulingId(): number {
        return this.schedulingId;
    }

}