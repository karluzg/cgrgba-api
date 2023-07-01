
import { FeedbackTypeEnum } from "../../../../domain/model/enum/FeedbackTypeEnum"
import { ParamsTemplate } from "../../../../infrestructure/template/ParamsTemplate"

export class FeedbackParams extends ParamsTemplate {

    private readonly  feedbackMessageType: FeedbackTypeEnum
    private readonly citizenName: string
    private readonly citizenEmail: string
    private  message: string
    
    constructor(feedbackMessageType:FeedbackTypeEnum, citizenName: string, citizenEmail: string,message: string) {
        super()
        this.feedbackMessageType = feedbackMessageType;
        this.citizenName = citizenName;
        this.citizenEmail = citizenEmail;
        this.message = message;
    }

    get getCitizenName(): string{
        return this.citizenName
    }

   

    get getCitizenEmail(): string{
        return this.citizenEmail
    }

   

    get getFeedbackMessageType(): FeedbackTypeEnum{
        return this.feedbackMessageType
    }

    get getMessage(): string{
        return this.message
    }

    set  setMessage(message: string) {
        this.message =message;
    }

}