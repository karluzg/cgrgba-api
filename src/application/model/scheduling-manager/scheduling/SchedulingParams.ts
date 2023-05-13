import { ParamsTemplate } from "../../../../infrestructure/template/ParamsTemplate";

export class SchedulingParams extends ParamsTemplate {
    private citizenFullName: string;
    private citizenEmail: string;
    private citizenMobileNumber: string;
    private schedulingDate: string;
    private schedulingHour: string;
    private schedulingCategory: string;
    private schedulingService: string;

    constructor(citizenFullName: string, citizenEmail: string, citizenMobileNumber: string,
        schedulingDate: string,
        schedulingHour: string,
        schedulingCategory: string,
        schedulingService: string) {

        super();
        this.citizenFullName = citizenFullName;
        this.citizenEmail = citizenEmail
        this.citizenMobileNumber = citizenMobileNumber;
        this.schedulingDate = schedulingDate;
        this.schedulingHour = schedulingHour;
        this.schedulingCategory = schedulingCategory;
        this.schedulingService = schedulingService

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

    get getSchedulingCategory(): string {
        return this.schedulingCategory;
    }

    get getSchedulingService(): string {
        return this.schedulingService;
    }

}