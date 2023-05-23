import { ParamsTemplate } from "../../../../infrestructure/template/ParamsTemplate";

export class SchedulingParams extends ParamsTemplate {
    private citizenFullName: string;
    private citizenEmail: string;
    private citizenMobileNumber: string;
    private schedulingDate: string;
    private schedulingHour: string;
    private categoryCode: string;
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