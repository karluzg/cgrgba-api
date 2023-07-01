import { FeedbackMessageType } from "../../../domain/model/MessageType";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class FeedbackMessageTypeResult extends ResultTemplate{

    private feedbackMessageTypes:FeedbackMessageType[]
    constructor() {
        super();
        this.getSuccessfullyMessage();
    }

    get getFeedbackMessageTypes(): FeedbackMessageType[]{
        return this.feedbackMessageTypes;
    }

    set setFeedbackMessageTypes(feedbackMessageTypes:FeedbackMessageType[]){
         this.feedbackMessageTypes=feedbackMessageTypes
    }
}