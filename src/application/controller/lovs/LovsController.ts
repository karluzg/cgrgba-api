import { Request, Response } from "express";
import logger from "../../../infrestructure/config/logger";
import { HttpCodes } from "../../../infrestructure/response/enum/HttpCode";
import { container } from "tsyringe";
import { ILovsEngine } from "../../../domain/service/ILovsEngine";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { ForbiddenOperationException } from "../../../infrestructure/exceptions/ForbiddenOperationException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { ServiceParams } from "../../model/lovs/params/ServiceParams";
import { GetRolesParams } from "../../model/lovs/params/GetRolesParams";
import { AuthValidator } from "../validator/AuthValidator";
import { CategoryParams } from "../../model/lovs/params/CategoryParams";
import { CategoryEnum } from "../../../domain/model/enum/CategoryEnum";
import { FeedbackMessageTypeParams } from "../../model/lovs/params/FeedbackMessageTypeParams";

export class LovsController {

    public async get_service_by_category(request: Request, response: Response): Promise<Response> {

        try {

            const { categoryCode } = request.query;

            const params = new ServiceParams(categoryCode as CategoryEnum);

            logger.info("[LovsController] Perform dependency injection for ILovsEngine")
            const loveEngine = container.resolve<ILovsEngine>("ILovsEngine")
            const result = await loveEngine.get_service_by_categry(params)

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
                logger.error("[LovsController] Error while getting service by category", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }
    public async get_scheduling_category(request: Request, response: Response): Promise<Response> {

        try {


            const params = new CategoryParams();

            logger.info("[LovsController] Perform dependency injection for ILovsEngine")
            const loveEngine = container.resolve<ILovsEngine>("ILovsEngine")
            const result = await loveEngine.get_scheduling_category(params)

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
                logger.error("[LovsController] Error while getting scheduling category", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }


    public async get_roles(request: Request, response: Response): Promise<Response> {

        try {


            const authenticationToken = AuthValidator.checkAuthorizationToken(request);
        
            const params = new GetRolesParams(authenticationToken);

            logger.info("[LovsController] Perform dependency injection for ILovsEngine")
            const loveEngine = container.resolve<ILovsEngine>("ILovsEngine")
            const result = await loveEngine.get_roles(params)

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
                logger.error("[LovsController] Error while getting role list", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

    public async get_feedback_message_type(request: Request, response: Response): Promise<Response> {

        try {


            const params = new FeedbackMessageTypeParams();

            logger.info("[LovsController] Perform dependency injection for ILovsEngine")
            const loveEngine = container.resolve<ILovsEngine>("ILovsEngine")
            const result = await loveEngine.get_feedback_message_type(params)

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
                logger.error("[LovsController] Error while getting feedback message type", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

}