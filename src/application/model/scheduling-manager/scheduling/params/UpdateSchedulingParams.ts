import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";

export class UpdateSchedulingParams extends AuthParamsTemplate {

    private readonly schedulingId: number;
    private citizenFullName: string;
    private citizenEmail: string;
    private citizenMobileNumber: string;
    private schedulingDate: string;
    private schedulingHour: string;
    private categoryCode: string;
    private serviceCode: string;

    constructor(authentication: string, schedulingId: number,
        citizenFullName: string,
        citizenEmail: string,
        citizenMobileNumber: string,
        schedulingDate: string,
        schedulingHour: string,
        categoryCode: string,
        serviceCode: string) {

        super(authentication);
        this.schedulingId = schedulingId;
        this.citizenFullName = citizenFullName;
        this.citizenEmail = citizenEmail
        this.citizenMobileNumber = citizenMobileNumber;
        this.schedulingDate = schedulingDate;
        this.schedulingHour = schedulingHour;
        this.categoryCode = categoryCode;
        this.serviceCode = serviceCode

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

    get getCategoryCode(): string {
        return this.categoryCode;
    }

    get getServiceCode(): string {
        return this.serviceCode;
    }
}