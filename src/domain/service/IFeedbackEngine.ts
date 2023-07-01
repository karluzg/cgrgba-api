import { FeedbackResult } from "../../application/model/feedback/FeedbackResult";
import { GetFeedbackMessageListResult as GetFeedbackListResult } from "../../application/model/feedback/GetFeedbackListResult";
import { FeedbackParams } from "../../application/model/feedback/params/FeedbackParams";
import { GetFeedbackDetailParams as GetFeedbackDetailParams } from "../../application/model/feedback/params/GetFeedbackDetailParams";
import { GetFeedbackListParams } from "../../application/model/feedback/params/GetFeedbackListParams";
import { UpdateFeedbackStatusParams } from "../../application/model/feedback/params/UpdateFeedbackStatusParams";

export interface IFeedbackEngine {
    add_new_feedback(params: FeedbackParams): Promise<FeedbackResult>
    get_feedback_list(params: GetFeedbackListParams): Promise<GetFeedbackListResult>
    get_feedback_detail(params: GetFeedbackDetailParams): Promise<FeedbackResult>
    update_feedback_status(params: UpdateFeedbackStatusParams): Promise<FeedbackResult>
}