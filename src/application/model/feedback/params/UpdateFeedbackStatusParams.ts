import { FeedbackStatusEnum } from "../../../../domain/model/enum/FeedbackStatusEnum";
import { AuthParamsTemplate } from "../../../../infrestructure/template/AuthParamsTemplate";
export class UpdateFeedbackStatusParams extends AuthParamsTemplate {

    private readonly feedbackId: number;
    private readonly feedbackStatus: FeedbackStatusEnum;
    constructor(authentication: string, feedbackId: number, feedbackStatus: FeedbackStatusEnum) {
        super(authentication)
        this.feedbackId = feedbackId;
        this.feedbackStatus = feedbackStatus

    }
    get getFeedbackId(): number {
        return this.feedbackId;
    }

    get getFeedbackStatus(): FeedbackStatusEnum {
        return this.feedbackStatus
    }

}