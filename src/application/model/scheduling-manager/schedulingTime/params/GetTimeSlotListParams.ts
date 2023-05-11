import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";


export class GetTimeSlotListParams extends AuthParamsTemplate {

    private beginschedulingDate: string;

    constructor(authentication: string, beginschedulingDate: string) {
        super(authentication);
        this.beginschedulingDate = beginschedulingDate;
    }


    get getBeginSchedulingDate(): string {
        return this.beginschedulingDate
    }


}