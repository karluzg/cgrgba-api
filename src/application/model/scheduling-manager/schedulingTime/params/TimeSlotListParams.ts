
import { ParamsTemplate } from "../../../../../infrestructure/template/ParamsTemplate";


export class TimeSlotListParams extends ParamsTemplate {

    private readonly beginschedulingDate: string;

    constructor(beginschedulingDate: string) {
        super();
        this.beginschedulingDate = beginschedulingDate;
    }


    get getBeginSchedulingDate(): string {
        return this.beginschedulingDate
    }


}