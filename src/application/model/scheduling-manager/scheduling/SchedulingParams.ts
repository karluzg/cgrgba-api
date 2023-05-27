import { IsString } from "class-validator";
import { ParamsTemplate } from "../../../../infrestructure/template/ParamsTemplate";

export class SchedulingParams extends ParamsTemplate {
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
    @IsString()
    private categoryCode: string;
    @IsString()
    private serviceCode: string;

    constructor(citizenFullName: string, citizenEmail: string, citizenMobileNumber: string,
        schedulingDate: string,
        schedulingHour: string,
        categoryCode: string,
        serviceCode: string) {

        super();
        this.citizenFullName = citizenFullName;
        this.citizenEmail = citizenEmail
        this.citizenMobileNumber = citizenMobileNumber;
        this.schedulingDate = schedulingDate;
        this.schedulingHour = schedulingHour;
        this.categoryCode = categoryCode;
        this.serviceCode = serviceCode
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

    get getCategoryCode(): string {
        return this.categoryCode;
    }

    get getserviceCode(): string {
        return this.serviceCode;
    }
}