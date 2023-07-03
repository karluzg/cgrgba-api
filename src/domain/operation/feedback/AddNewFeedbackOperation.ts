import { container } from "tsyringe";
import { FeedbackResult } from "../../../application/model/feedback/FeedbackResult";
import { FeedbackParams } from "../../../application/model/feedback/params/FeedbackParams";
import { OperationTemplate } from "../../../infrestructure/template/OperationTemplate";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { IFeedbackEngineRepository } from "../../repository/IFeedbackEngineRepository";
import { Feedback } from "../../model/Feedback";
import { IFeedbackMessageTypeEngineRepository } from "../../repository/IFeedbackMessageTypeEngineRepository";
import { FeedbackMessageType } from "../../model/MessageType";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { FeedbackBuilder } from "../response-builder/feedback/FeedbackBuilder";
import logger from "../../../infrestructure/config/logger";

export class AddNewFeedbackOperation extends OperationTemplate<FeedbackResult, FeedbackParams>{

    private readonly feedbackEngineRepository: IFeedbackEngineRepository;
    private readonly feedbackMessageTypeEngineRepository: IFeedbackMessageTypeEngineRepository
    private feedbackMessageType: FeedbackMessageType;

    constructor() {
        super(OperationNamesEnum.FEEDBACK_ADD)
        this.feedbackEngineRepository = container.resolve<IFeedbackEngineRepository>('IFeedbackEngineRepository')
        this.feedbackMessageTypeEngineRepository = container.resolve<IFeedbackMessageTypeEngineRepository>('IFeedbackMessageTypeEngineRepository')

    }

    protected async doValidateParameters(params: FeedbackParams): Promise<void> {

        logger.info("[GetFeedbackMessageListOperation] Begin high-level validation add new feedback parameters...");
       
       
        this.feedbackMessageType = await this.feedbackMessageTypeEngineRepository.getFeedbackMessageByType(params.getFeedbackMessageType)
      
        logger.log("[AddNewFeedbackOperation] Feedback message type founded %s", this.feedbackMessageType)

        if (!this.feedbackMessageType) {
            throw new InvalidParametersException(Field.FEEDBACK_MESSAGE_TYPE_CODE,
                MiddlewareBusinessMessage.FEEDBACK_MESSAGE_TYPE_CODE_INVALD)
        }

        
        logger.info("[GetFeedbackMessageListOperation] End high-level validation add new feedback parameters...");
    }

    protected async doExecute(params: FeedbackParams, result: FeedbackResult): Promise<void> {


        let newFeedback = new Feedback();

        newFeedback.citizenName = params.getCitizenName;
        newFeedback.citizenEmail = params.getCitizenEmail;
        newFeedback.type = this.feedbackMessageType;
        newFeedback.messageContent = params.getMessage;
        newFeedback.year = new Date(new Date()).getFullYear();
        newFeedback.month = new Date(new Date()).getMonth() + 1;
        newFeedback.day = new Date(new Date()).getDate();

        logger.log("[AddNewFeedbackOperation] Adding new feedback %s", newFeedback)
        newFeedback= await this.feedbackEngineRepository.saveFeedback(newFeedback)

        logger.log("[AddNewFeedbackOperation] New feedback new added % ", newFeedback)
        const newFeedbackResponse = await FeedbackBuilder.buildFeedbackResponse(newFeedback);

        result.setFeedback = newFeedbackResponse;

    }

    protected initResult(): FeedbackResult {
        return new FeedbackResult();
    }


}