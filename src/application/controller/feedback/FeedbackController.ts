import { Request, Response } from "express";
import { container } from "tsyringe";
import logger from "../../../infrestructure/config/logger";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { ForbiddenOperationException } from "../../../infrestructure/exceptions/ForbiddenOperationException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { HttpCodes } from "../../../infrestructure/response/enum/HttpCode";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { FeedbackParams } from "../../model/feedback/params/FeedbackParams";
import { IFeedbackEngine } from "../../../domain/service/IFeedbackEngine";
import { GetFeedbackDetailParams } from "../../model/feedback/params/GetFeedbackDetailParams";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { AuthValidator } from "../validator/AuthValidator";
import { GetFeedbackListParams } from "../../model/feedback/params/GetFeedbackListParams";
import { FeedbackTypeEnum } from "../../../domain/model/enum/FeedbackTypeEnum";
import { FeedbackStatusEnum } from "../../../domain/model/enum/FeedbackStatusEnum";
import { DirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { UpdateFeedbackStatusParams } from "../../model/feedback/params/UpdateFeedbackStatusParams";

export class FeedbackController {
    public async add_new_feedback(request: Request, response: Response): Promise<Response> {

        try {

            const {feedbackMessageType,
                citizenFullName,
                citizenEmail,
                message } = request.body;


            const params = new FeedbackParams(feedbackMessageType, citizenFullName, citizenEmail, message);

            logger.info("[FeedbackController] Perform dependency injection for IFeedbackEngine")
            const feedbackEngine = container.resolve<IFeedbackEngine>("IFeedbackEngine")
            const result = await feedbackEngine.add_new_feedback(params)

            return response.status(HttpCodes.OK).json(result)

        } catch (error) {

            if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
                throw new NotImplementedException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.FORBIDDEN) {
                throw new ForbiddenOperationException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.UNSUCCESSFULLY) {
                throw new UnsuccessfullOperationException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
                throw new UnauthorizedOperationException(error.field, error.message)
            } else {
                logger.error("[FeedbackController] Error while adding new scheduling", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }
    public async get_feedback_detail(request: Request, response: Response): Promise<Response> {

        try {
            const feedbackId = parseInt(request.params.id);

            if (isNaN(feedbackId)) {
                throw new InvalidParametersException(Field.FEEDBACK_ID, MiddlewareBusinessMessage.FEEDBACK_ID_INVALID)
            }

            const authenticationToken = AuthValidator.checkAuthorizationToken(request);

            const params = new GetFeedbackDetailParams(authenticationToken, feedbackId);

            logger.info("[FeedbackController] Perform dependency injection for IFeedbackEngine")
            const feedbackEngine = container.resolve<IFeedbackEngine>("IFeedbackEngine")
            const result = await feedbackEngine.get_feedback_detail(params)

            return response.status(HttpCodes.OK).json(result)

        } catch (error) {

            if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
                throw new NotImplementedException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.FORBIDDEN) {
                throw new ForbiddenOperationException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.UNSUCCESSFULLY) {
                throw new UnsuccessfullOperationException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
                throw new UnauthorizedOperationException(error.field, error.message)
            } else {
                logger.error("[FeedbackController] Error while getting feedback deail", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

    public async get_feedback_list(request: Request, response: Response): Promise<Response> {

        try {
            const { beginFeedbackDate,
                endFeedbackDate,
                feedbackType,
                status,
                orderColumn,
                direction,
                pageNumber,
                pageSize } = request.query;

            const authenticationToken = AuthValidator.checkAuthorizationToken(request);

            const params = new GetFeedbackListParams(
                authenticationToken,
                beginFeedbackDate as string,
                endFeedbackDate as string,
                feedbackType as FeedbackTypeEnum,
                status as FeedbackStatusEnum,
                orderColumn as string,
                direction as DirectionEnum,
                parseInt(pageNumber as string, 10) || 1,
                parseInt(pageSize as string, 10) || 10
            );

            logger.info("[FeedbackController] Perform dependency injection for IFeedbackEngine")
            const feedbackEngine = container.resolve<IFeedbackEngine>("IFeedbackEngine")
            const result = await feedbackEngine.get_feedback_list(params)

            return response.status(HttpCodes.OK).json(result)

        } catch (error) {

            if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
                throw new NotImplementedException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.FORBIDDEN) {
                throw new ForbiddenOperationException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.UNSUCCESSFULLY) {
                throw new UnsuccessfullOperationException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
                throw new UnauthorizedOperationException(error.field, error.message)
            } else {
                logger.error("[FeedbackController] Error while getting feedback list", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

    public async update_feedback_status(request: Request, response: Response): Promise<Response> {

        try {


            const feedbackId = parseInt(request.params.id);

            if (isNaN(feedbackId)) {
                throw new InvalidParametersException(Field.FEEDBACK_ID, MiddlewareBusinessMessage.FEEDBACK_ID_INVALID)
            }


            const { feedbackStatus } = request.body;

            const authenticationToken = AuthValidator.checkAuthorizationToken(request);

            const params = new UpdateFeedbackStatusParams(authenticationToken, feedbackId,
                feedbackStatus);

            logger.info("[FeedbackController] Perform dependency injection for IFeedbackEngine")
            const feedbackEngine = container.resolve<IFeedbackEngine>("IFeedbackEngine")
            const result = await feedbackEngine.update_feedback_status(params)

            return response.status(HttpCodes.OK).json(result)

        } catch (error) {

            if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
                throw new NotImplementedException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.FORBIDDEN) {
                throw new ForbiddenOperationException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.UNSUCCESSFULLY) {
                throw new UnsuccessfullOperationException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.UNAUTHORIZED) {
                throw new UnauthorizedOperationException(error.field, error.message)
            } else {
                logger.error("[FeedbackController] Error while update feedback status", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

}