import { container } from "tsyringe";
import { FeedbackResult } from "../../../application/model/feedback/FeedbackResult";
import { UpdateFeedbackStatusParams as UpdateFeedbackParams } from "../../../application/model/feedback/params/UpdateFeedbackStatusParams";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { Feedback } from "../../model/Feedback";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { IFeedbackEngineRepository } from "../../repository/IFeedbackEngineRepository";
import { IFeedbackPossibleStatusEngineRepository } from "../../repository/IFeedbackPossibleStatusEngineRepository";
import { FeedbackPossibleStatus } from "../../model/FeedbackPossibleStatus";
import logger from "../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { IFeedbackStatusEngineRepository } from "../../repository/IFeedbackStatusEngineRepository";
import { FeedbackStatus } from "../../model/FeedbackStatus";
import { FeedbackBuilder } from "../response-builder/feedback/FeedbackBuilder";
import { FeedbackStatusEnum } from "../../model/enum/FeedbackStatusEnum";

export class UpdateFeedbackStatusOperation extends UserAuthOperationTemplate<FeedbackResult, UpdateFeedbackParams>{

    private readonly feedbackEngineRepository: IFeedbackEngineRepository;
    private readonly feedbackPossibleStatusRepository: IFeedbackPossibleStatusEngineRepository;
    private readonly feedbackStatusEngineRepository: IFeedbackStatusEngineRepository;

    private feedbackNextPossibleStatus: FeedbackPossibleStatus[] = []
    private feedback: Feedback;
    private matchingNextStatus: FeedbackPossibleStatus;


    constructor() {
        super(OperationNamesEnum.FEEDBACK_UPDATE_STATUS, OperationValidatorManager.getSingletonInstance())
        this.feedbackEngineRepository = container.resolve<IFeedbackEngineRepository>('IFeedbackEngineRepository');
        this.feedbackStatusEngineRepository = container.resolve<IFeedbackStatusEngineRepository>('IFeedbackStatusEngineRepository')

    }

    protected async doValidateParameters(params: UpdateFeedbackParams): Promise<void> {

        logger.info("[UpdateFeedbackMessageStatus] Begin high-level validation of update feedback status data parameters...");

        this.feedback = await this.feedbackEngineRepository.findFeedbackById(params.getFeedbackId);

        logger.info("[UpdateFeedbackMessageStatus] Feedback entity founded", JSON.stringify(this.feedback));

        if (!this.feedback) {
            throw new InvalidParametersException(Field.FEEDBACK_ID, MiddlewareBusinessMessage.FEEDBACK_ID_INVALID);
        }

        const feedbackStatus: FeedbackStatus = await this.feedbackStatusEngineRepository.findFeedbackStatus(params.getFeedbackStatus);

        if (!feedbackStatus) {
            throw new InvalidParametersException(Field.FEEDBACK_STATUS, MiddlewareBusinessMessage.FEEDBACK_STATUS);
        }

        this.feedbackNextPossibleStatus = await this.feedbackPossibleStatusRepository.findFeedbackNextStatus(feedbackStatus.code);

        logger.info("Next Possible status %s", this.feedbackNextPossibleStatus)
        logger.info("Next Possible status INPUT %s:", params.getFeedbackStatus)

        this.matchingNextStatus = this.feedbackNextPossibleStatus.find(
            (nextStatus: FeedbackPossibleStatus) => nextStatus.nextStatus.code === params.getFeedbackStatus
        );

        logger.info("Matched next status", JSON.stringify(this.matchingNextStatus))

        if (!this.matchingNextStatus) {
            throw new InvalidParametersException(Field.FEEDBACK_STATUS, MiddlewareBusinessMessage.FEEDBACK_STATUS);
        }

        logger.info("[UpdateFeedbackMessageStatus] End of strict validation of change feedback status parameters...");
    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: UpdateFeedbackParams, result: FeedbackResult): Promise<void> {

        const newFeedback = await this.updateFeedback(tokenSession)

        const newFeedbackResponse = await FeedbackBuilder.buildFeedbackResponse(newFeedback);

        result.setFeedback = newFeedbackResponse;

        this.feedbackNextPossibleStatus = await this.feedbackPossibleStatusRepository.findFeedbackNextStatus(newFeedback.status.code);

        result.setPossibleStatus = this.feedbackNextPossibleStatus;


    }

    private async updateFeedback(tokenSession: TokenSession): Promise<Feedback> {

        logger.info("[AddNewSchedulingOperation] Changing feedback status...")
        this.feedback.status = this.matchingNextStatus.nextStatus

        if (this.matchingNextStatus.code === FeedbackStatusEnum.PUBLISHED) {
            this.feedback.publishedBy = tokenSession.user;
            this.feedback.publsihedDate = new Date();

        } else {
            this.feedback.updateBy = tokenSession.user
            this.feedback.revokingDate = new Date();
        }

        return await this.feedbackEngineRepository.saveFeedback(this.feedback);


    }
    protected initResult(): FeedbackResult {
        return new FeedbackResult();
    }


}