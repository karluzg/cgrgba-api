import { FeedbackStatusEnum } from "../../../../domain/model/enum/FeedbackStatusEnum";
import { FeedbackTypeEnum } from "../../../../domain/model/enum/FeedbackTypeEnum";
import { DirectionEnum } from "../../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { AuthParamsTemplate } from "../../../../infrestructure/template/AuthParamsTemplate";

export class GetFeedbackListParams extends AuthParamsTemplate {

    private readonly beginFeedbackDate: string;
    private readonly endFeedbackDate: string;
    private readonly feedbackType: FeedbackTypeEnum;
    private readonly status: FeedbackStatusEnum;
    private readonly orderColumn: string;
    private readonly direction: DirectionEnum;
    private readonly pageNumber: number;
    private readonly pageSize: number;

    constructor(authentication: string, beginFeedbackDate: string,
        endFeedbackDate: string,
        feedbackType: FeedbackTypeEnum,
        status: FeedbackStatusEnum,
        orderColumn: string,
        direction: DirectionEnum,
        pageNumber: number,
        pageSize: number
    ) {

        super(authentication)
        this.beginFeedbackDate = beginFeedbackDate;
        this.endFeedbackDate = endFeedbackDate;
        this.feedbackType = feedbackType;
        this.status = status;
        this.orderColumn = orderColumn;
        this.direction = direction
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;

    }
    get getBeginFeedbackDate(): string {
        return this.beginFeedbackDate
    }

    get getEndFeedbackDate(): string {
        return this.endFeedbackDate
    }

    get getFeedbackType(): FeedbackTypeEnum {
        return this.feedbackType
    }

    get getStatus(): FeedbackStatusEnum {
        return this.status
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