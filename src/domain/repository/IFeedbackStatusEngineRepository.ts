import { FeedbackStatus } from "../model/FeedbackStatus";
import { FeedbackStatusEnum } from "../model/enum/FeedbackStatusEnum";

export interface IFeedbackStatusEngineRepository{
    findFeedbackStatus(feedbackStatusCode: FeedbackStatusEnum):Promise<FeedbackStatus>
}