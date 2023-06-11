import { CategoryEnum } from "../../../../../domain/model/enum/CategoryEnum";
import { SchedulingStatusEnum } from "../../../../../domain/model/enum/SchedulingStatusEnum";
import { ServiceEnum } from "../../../../../domain/model/enum/ServiceEnum";
import { DirectionEnum } from "../../../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";

export class GetSchedulingListParams extends AuthParamsTemplate {

    private readonly beginCreationDate: string;
    private readonly endCreationDate: string;
    private readonly categoryCode: CategoryEnum;
    private readonly serviceCode: ServiceEnum;
    private readonly schedulingStatus: SchedulingStatusEnum;
    private readonly orderColumn: string;
    private readonly direction: DirectionEnum;
    private readonly pageNumber: number;
    private readonly pageSize: number;

    constructor(authentication: string,
        beginCreationDate: string,
        endCreationDate: string,
        categoryCode: CategoryEnum,
        serviceCode: ServiceEnum,
        schedulingStatus: SchedulingStatusEnum,
        orderColumn: string,
        direction: DirectionEnum,
        pageNumber: number,
        pageSize: number) {
        super(authentication);
        this.beginCreationDate = beginCreationDate;
        this.endCreationDate = endCreationDate;
        this.categoryCode = categoryCode;
        this.serviceCode = serviceCode;
        this.schedulingStatus = schedulingStatus;
        this.orderColumn = orderColumn;
        this.direction = direction
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }

    get getBeginCreationDate(): string {
        return this.beginCreationDate
    }

    get getEndCreationDate(): string {
        return this.endCreationDate
    }

    get getCategoryCode(): CategoryEnum {
        return this.categoryCode
    }

    get getServiceCode(): ServiceEnum {
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








