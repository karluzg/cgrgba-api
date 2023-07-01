import { Feedback } from "../../../domain/model/Feedback";
import { FeedbackPossibleStatus } from "../../../domain/model/FeedbackPossibleStatus";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class FeedbackResult extends ResultTemplate{
   
    private feedback: Feedback
    private nextPossibleStatus: FeedbackPossibleStatus[]
    
    constructor() {
        super();
        this.getSuccessfullyMessage();
    }

    get getFeedback(): Feedback{
        return this.feedback;
    }

    set setFeedback(feedback: Feedback) {
        this.feedback = feedback;
    }

    public get getPossibleStatus(): FeedbackPossibleStatus[] {
        return this.nextPossibleStatus;
    }
    public set setPossibleStatus(possibleStatus: FeedbackPossibleStatus[]) {
        this.nextPossibleStatus = possibleStatus;
    }
}