import { IsEnum, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { CategoryEum } from "../../../../../domain/model/enum/CategoryEnum";
import { SchedulingStatusEnum } from "../../../../../domain/model/enum/SchedulingStatusEnum";
import { ServiceEnum } from "../../../../../domain/model/enum/ServiceEnum";
import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";
import { Type } from "class-transformer";
import { User } from "../../../../../domain/model/User";

export class UpdateSchedulingParams extends AuthParamsTemplate {

    @IsNumber()
    private readonly schedulingId: number;
    @IsString()
    private citizenFullName: string;
    @IsString()
    private citizenEmail: string;
    @IsString()
    private citizenMobileNumber: string;
    @IsString()
    private schedulingDate: string;
    @IsString()
    private schedulingHour: string;
    @IsEnum(CategoryEum)
    private categoryCode: CategoryEum;
    @IsEnum(ServiceEnum)
    private serviceCode: ServiceEnum;


    constructor(authentication: string, schedulingId: number,
        citizenFullName: string,
        citizenEmail: string,
        citizenMobileNumber: string,
        schedulingDate: string,
        schedulingHour: string,
        categoryCode: CategoryEum,
        serviceCode: ServiceEnum) {

        super(authentication);
        this.schedulingId = schedulingId;
        this.citizenFullName = citizenFullName;
        this.citizenEmail = citizenEmail
        this.citizenMobileNumber = citizenMobileNumber;
        this.schedulingDate = schedulingDate;
        this.schedulingHour = schedulingHour;
        this.categoryCode = categoryCode;
        this.serviceCode = serviceCode;


    }
    get getSchedulingId(): number {
        return this.schedulingId;
    }
    get getCitizenFullName(): string {
        return this.citizenFullName;
    }

    get getCitizenEmail(): string {
        return this.citizenEmail;
    }

    get getCitizenMobileNumber(): string {
        return this.citizenMobileNumber;
    }

    get getSchedulingDate(): string {
        return this.schedulingDate;
    }

    get getSchedulingHour(): string {
        return this.schedulingHour;
    }

    get getCategory(): CategoryEum {
        return this.categoryCode;
    }

    get getServiceCode(): ServiceEnum {
        return this.serviceCode;
    }


}