import { IsEnum, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { CategoryEnum } from "../../../../../domain/model/enum/CategoryEnum";
import { ServiceEnum } from "../../../../../domain/model/enum/ServiceEnum";
import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";


export class UpdateSchedulingParams extends AuthParamsTemplate {

 
    private readonly schedulingId: number;

    private schedulingDate: string;
 
    private schedulingHour: string;

    private categoryCode: CategoryEnum;

    private serviceCode: ServiceEnum;


    constructor(authentication: string, schedulingId: number,
        schedulingDate: string,
        schedulingHour: string,
        categoryCode: CategoryEnum,
        serviceCode: ServiceEnum) {

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

    get getCategory(): CategoryEnum {
        return this.categoryCode;
    }

    get getServiceCode(): ServiceEnum {
        return this.serviceCode;
    }


}