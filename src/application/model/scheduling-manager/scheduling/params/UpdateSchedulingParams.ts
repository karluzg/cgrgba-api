import { CategoryEum } from "../../../../../domain/model/enum/CategoryEnum";
import { SchedulingStatusEnum } from "../../../../../domain/model/enum/SchedulingStatusEnum";
import { ServiceEnum } from "../../../../../domain/model/enum/ServiceEnum";
import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";

export class UpdateSchedulingParams extends AuthParamsTemplate {

    private readonly schedulingId: number;
    private citizenFullName: string;
    private citizenEmail: string;
    private citizenMobileNumber: string;
    private schedulingDate: string;
    private schedulingHour: string;
    private categoryCode: CategoryEum;
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