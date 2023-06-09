import {  IsString } from "class-validator";
import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";


export class UpdateSchedulingParams extends AuthParamsTemplate {


    private readonly schedulingId: number;
    @IsString()
    private schedulingDate: string;
    @IsString()
 
    private schedulingHour: string;
    @IsString()
    private categoryCode: string;
    @IsString()
    private serviceCode: string;


    constructor(authentication: string, schedulingId: number,
        schedulingDate: string,
        schedulingHour: string,
        categoryCode: string,
        serviceCode: string) {

        super(authentication);
        this.schedulingId = schedulingId;
        this.schedulingDate = schedulingDate;
        this.schedulingHour = schedulingHour;
        this.categoryCode = categoryCode;
        this.serviceCode = serviceCode;


    }
    get getSchedulingId(): number {
        return this.schedulingId;
    }

    get getSchedulingDate(): string {
        return this.schedulingDate;
    }

    get getSchedulingHour(): string {
        return this.schedulingHour;
    }

    get getCategory(): string {
        return this.categoryCode;
    }

    get getServiceCode(): string {
        return this.serviceCode;
    }


}