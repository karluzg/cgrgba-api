import { AuthParamsTemplate } from "../../../../infrestructure/template/AuthParamsTemplate";

export class GetFeedbackDetailParams extends AuthParamsTemplate {

    private readonly feedbackId: number;

    constructor(authentication: string, feedbackId: number) {
        super(authentication)
        this.feedbackId = feedbackId;
    }

    get getFeedbackId(): number {
        return this.feedbackId;
    }
}