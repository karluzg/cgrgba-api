import { container } from "tsyringe";
import { FeedbackResult } from "../../../application/model/feedback/FeedbackResult";
import { GetFeedbackDetailParams } from "../../../application/model/feedback/params/GetFeedbackDetailParams";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { IFeedbackEngineRepository } from "../../repository/IFeedbackEngineRepository";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { Feedback } from "../../model/Feedback";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import logger from "../../../infrestructure/config/logger";
import { FeedbackBuilder } from "../response-builder/feedback/FeedbackBuilder";
import { IFeedbackPossibleStatusEngineRepository } from "../../repository/IFeedbackPossibleStatusEngineRepository";
import { FeedbackPossibleStatus } from "../../model/FeedbackPossibleStatus";

export class GetFeedbackDetailOperation extends UserAuthOperationTemplate<FeedbackResult, GetFeedbackDetailParams>{

    private readonly feedbackEngineRepository: IFeedbackEngineRepository;
    private readonly feedbackPossibleStatusRepository: IFeedbackPossibleStatusEngineRepository;
    private feedbackNextPossibleStatus: FeedbackPossibleStatus[] = []
    private feedback: Feedback

    constructor() {
        super(OperationNamesEnum.FEEDBACK_GET_DETAIL, OperationValidatorManager.getSingletonInstance())
        this.feedbackEngineRepository = container.resolve<IFeedbackEngineRepository>('IFeedbackEngineRepository');
        this.feedbackPossibleStatusRepository = container.resolve<IFeedbackPossibleStatusEngineRepository>('IFeedbackPossibleStatusEngineRepository');
        

    }

    protected async doValidateParameters(params: GetFeedbackDetailParams): Promise<void> {

        this.feedback = await this.feedbackEngineRepository.findFeedbackById(params.getFeedbackId);
        logger.info("[GetFeedbackMessageDetailOperation] - Feedback founded %s", this.feedback)

        if (!this.feedback) {
            throw new InvalidParametersException(Field.FEEDBACK_ID, MiddlewareBusinessMessage.FEEDBACK_ID_INVALID)
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetFeedbackDetailParams, result: FeedbackResult): Promise<void> {
        const newFeedbackResponse = await FeedbackBuilder.buildFeedbackResponse(this.feedback);
        
        this.feedbackNextPossibleStatus = await this.feedbackPossibleStatusRepository.findFeedbackNextStatus(newFeedbackResponse.status.code);

        result.setFeedback = newFeedbackResponse;
        result.setPossibleStatus = this.feedbackNextPossibleStatus;
    }
    protected initResult(): FeedbackResult {
        return new FeedbackResult();
    }

}