import { DirectionEnum } from "../../../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";

export class GetSchedulingListParams extends AuthParamsTemplate {

    private readonly beginCreationDate: string;
    private readonly endCreationDate: string;
    private readonly beginSchedulingTime: string;
    private readonly endSchedulingTime: string;
    private readonly beginSchedulingStatus: string;
    private readonly orderColumn: string;
    private readonly direction: DirectionEnum;
    private readonly pageNumber: number;
    private readonly pageSize: number;

    constructor(authentication: string,
        beginCreationDate: string,
        endCreationDate: string,
        beginSchedulingTime: string,
        endSchedulingTime: string,
        schedulingStatus: string,
        orderColumn: string,
        direction: DirectionEnum,
        pageNumber: number,
        pageSize: number) {
        super(authentication);
        this.beginCreationDate = beginCreationDate;
        this.endCreationDate = endCreationDate;
        this.beginSchedulingTime = beginSchedulingTime;
        this.endSchedulingTime = endSchedulingTime;
        this.beginSchedulingStatus = schedulingStatus;
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

    get getBeginSchedulingTime(): string {
        return this.beginSchedulingTime
    }

    get getEndSchedulingTime(): string {
        return this.endSchedulingTime
    }


    get getBeginSchedulingStatus(): string {
        return this.beginSchedulingStatus
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








