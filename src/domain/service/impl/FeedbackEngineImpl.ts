import { FeedbackResult } from "../../../application/model/feedback/FeedbackResult";
import { GetFeedbackMessageListResult } from "../../../application/model/feedback/GetFeedbackListResult";
import { FeedbackParams } from "../../../application/model/feedback/params/FeedbackParams";
import { GetFeedbackDetailParams } from "../../../application/model/feedback/params/GetFeedbackDetailParams";
import { GetFeedbackListParams } from "../../../application/model/feedback/params/GetFeedbackListParams";
import { UpdateFeedbackStatusParams } from "../../../application/model/feedback/params/UpdateFeedbackStatusParams";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { AddNewFeedbackOperation } from "../../operation/feedback/AddNewFeedbackOperation";
import { GetFeedbackDetailOperation } from "../../operation/feedback/GetFeedbackDetailOperation";
import { GetFeedbackListOperation } from "../../operation/feedback/GetFeedbackListOperation";
import { UpdateFeedbackStatusOperation } from "../../operation/feedback/UpdateFeedbackStatusOperation";
import { IFeedbackEngine } from "../IFeedbackEngine";

export class FeedbackEngineImpl extends GenericOperationTemplate implements IFeedbackEngine {


    add_new_feedback(params: FeedbackParams): Promise<FeedbackResult> {
        return this.executeOperation(new AddNewFeedbackOperation(), params)
    }

    get_feedback_list(params: GetFeedbackListParams): Promise<GetFeedbackMessageListResult> {
        return this.executeOperation(new GetFeedbackListOperation(), params)
    }
    get_feedback_detail(params: GetFeedbackDetailParams): Promise<FeedbackResult> {
        return this.executeOperation(new GetFeedbackDetailOperation(), params)
    }
    update_feedback_status(params: UpdateFeedbackStatusParams): Promise<FeedbackResult> {
        return this.executeOperation(new UpdateFeedbackStatusOperation(), params)
    }

}