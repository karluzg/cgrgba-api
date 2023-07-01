import { container } from "tsyringe"
import { FeedbackMessageTypeResult } from "../../../application/model/lovs/FeedbackMessageTypeResult"
import { FeedbackMessageTypeParams } from "../../../application/model/lovs/params/FeedbackMessageTypeParams"
import { OperationTemplate } from "../../../infrestructure/template/OperationTemplate"
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum"
import { IFeedbackMessageTypeEngineRepository } from "../../repository/IFeedbackMessageTypeEngineRepository"
import { FeedbackMessageType } from "../../model/MessageType"

export class FeedbackMessageTypeOperation extends OperationTemplate<FeedbackMessageTypeResult, FeedbackMessageTypeParams>{
  
    private readonly feedbackMessageTypeEngineRepository:IFeedbackMessageTypeEngineRepository
    private feedbackMessageTypes: FeedbackMessageType[] = [];

    constructor() {
        super(OperationNamesEnum.FEEDBACK_LIST_MESSAGE_TYPE)
        this.feedbackMessageTypeEngineRepository = container.resolve<IFeedbackMessageTypeEngineRepository>('IFeedbackMessageTypeEngineRepository')

    }
  
    protected async doExecute(params: FeedbackMessageTypeParams, result: FeedbackMessageTypeResult): Promise<void> {
        this.feedbackMessageTypes = await this.feedbackMessageTypeEngineRepository.getAllFeedbackMessageType();
      
        result.setFeedbackMessageTypes = this.feedbackMessageTypes;
    }
    protected initResult(): FeedbackMessageTypeResult {
        throw new Error("Method not implemented.")
    }

}
