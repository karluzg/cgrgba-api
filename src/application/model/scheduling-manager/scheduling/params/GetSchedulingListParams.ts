
import { SchedulingStatusEnum } from "../../../../../domain/model/enum/SchedulingStatusEnum";
import { DirectionEnum } from "../../../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";

export class GetSchedulingListParams extends AuthParamsTemplate {

    private readonly beginSchedulingDate: string;
    private readonly endSchedulingDate: string;
    private readonly categoryCode: string;
    private readonly serviceCode: string;
    private readonly schedulingStatus: SchedulingStatusEnum;
    private readonly orderColumn: string;
    private readonly direction: DirectionEnum;
    private readonly pageNumber: number;
    private readonly pageSize: number;

    constructor(authentication: string,
        beginCreationDate: string,
        endCreationDate: string,
        categoryCode: string,
        serviceCode: string,
        schedulingStatus: SchedulingStatusEnum,
        orderColumn: string,
        direction: DirectionEnum,
        pageNumber: number,
        pageSize: number) {
        super(authentication);
        this.beginSchedulingDate = beginCreationDate;
        this.endSchedulingDate = endCreationDate;
        this.categoryCode = categoryCode;
        this.serviceCode = serviceCode;
        this.schedulingStatus = schedulingStatus;
        this.orderColumn = orderColumn;
        this.direction = direction
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }

    get getBeginSchedulingDate(): string {
        return this.beginSchedulingDate
    }

    get getEndSchedulingDate(): string {
        return this.endSchedulingDate
    }

    get getCategoryCode(): string {
        return this.categoryCode
    }

    get getServiceCode(): string {
        return this.serviceCode
    }


    get getSchedulingStatus(): SchedulingStatusEnum {
        return this.schedulingStatus
    }

    get getOrderColumn(): string {
        return this.orderColumn;
    }

    get getDirection(): DirectionEnum {
        return this.direction;
    }

    get getPageNumber(): number {
        return this.pageNumber
    }


    get getPageSize(): number {
        return this.pageSize
    }

}








