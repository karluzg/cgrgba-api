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

export class AddNewFeedbackOperation extends OperationTemplate<FeedbackResult, FeedbackParams>{

    private readonly feedbackEngineRepository: IFeedbackEngineRepository;
    private readonly feedbackMessageTypeEngineRepository: IFeedbackMessageTypeEngineRepository
    private feedbackMessageType: FeedbackMessageType;

    constructor() {
        super(OperationNamesEnum.FEEDBACK_ADD)
        this.feedbackEngineRepository = container.resolve<IFeedbackEngineRepository>('IFeedbackEngineRepository')

    }

    protected async doValidateParameters(params: FeedbackParams): Promise<void> {

        this.feedbackMessageType = await this.feedbackMessageTypeEngineRepository.getFeedbackMessageByType(params.getFeedbackMessageType)

        if (!this.feedbackMessageType) {
            throw new InvalidParametersException(Field.FEEDBACK_MESSAGE_TYPE_CODE,
                MiddlewareBusinessMessage.FEEDBACK_MESSAGE_TYPE_CODE_INVALD)
        }
    }

    protected async doExecute(params: FeedbackParams, result: FeedbackResult): Promise<void> {


        const newFeedback = new Feedback();

        newFeedback.citizenName = params.getCitizenName;
        newFeedback.citizenEmail = params.getCitizenEmail;
        newFeedback.type = this.feedbackMessageType;
        newFeedback.year = new Date(newFeedback.creationDate).getFullYear();
        newFeedback.month = new Date(newFeedback.creationDate).getMonth() + 1;
        newFeedback.day = new Date(newFeedback.creationDate).getDate();

        this.feedbackEngineRepository.saveFeedback(newFeedback)

        const newFeedbackResponse = await FeedbackBuilder.buildFeedbackResponse(newFeedback);

        result.setFeedback = newFeedbackResponse;

    }

    protected initResult(): FeedbackResult {
        return new FeedbackResult();
    }


}