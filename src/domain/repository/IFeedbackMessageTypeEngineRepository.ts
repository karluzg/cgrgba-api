import { FeedbackMessageType } from "../model/MessageType";
import { FeedbackTypeEnum } from "../model/enum/FeedbackTypeEnum";

export interface IFeedbackMessageTypeEngineRepository{
    getAllFeedbackMessageType(): Promise<FeedbackMessageType[]>
    getFeedbackMessageByType(feedbabckMessageTypeCode: FeedbackTypeEnum):Promise<FeedbackMessageType>
}