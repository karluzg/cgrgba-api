import { FeedbackPossibleStatus } from "../model/FeedbackPossibleStatus";

export interface IFeedbackPossibleStatusEngineRepository{
    findFeedbackNextStatus(feedbackCurrentStatusCode: string): Promise<FeedbackPossibleStatus[]>

}