import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";


export class TimeSlotListParams extends AuthParamsTemplate {

    private readonly beginschedulingDate: string;

    constructor(authentication: string, beginschedulingDate: string) {
        super(authentication);
        this.beginschedulingDate = beginschedulingDate;
    }


    get getBeginSchedulingDate(): string {
        return this.beginschedulingDate
    }


}