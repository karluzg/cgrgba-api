import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { ForbiddenOperationException } from "../../../infrestructure/exceptions/ForbiddenOperationException";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import logger from "../../../infrestructure/config/logger";
import { HttpCodes } from "../../../infrestructure/response/enum/HttpCode";
import { SchedulingParams } from "../../model/scheduling-manager/scheduling/SchedulingParams";
import { ISchedulingEngine } from "../../../domain/service/ISchedulingEngine";
import { AuthValidator } from "../validator/AuthValidator";
import { GetSchedulingListParams } from "../../model/scheduling-manager/scheduling/params/GetSchedulingListParams";
import { DirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { GetSchedulingDetailParams } from "../../model/scheduling-manager/scheduling/params/GetSchedulingDetailParams";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { UpdateSchedulingParams } from "../../model/scheduling-manager/scheduling/params/UpdateSchedulingParams";

import { SchedulingStatusEnum } from "../../../domain/model/enum/SchedulingStatusEnum";
import { ChangeSchedulingStatusParams } from "../../model/scheduling-manager/scheduling/params/ChangeSchedulingStatusParams";
import { GetSchedulingStatictiscsParams as GetSchedulingStatistiscsParams } from "../../model/scheduling-manager/scheduling/params/GetSchedulingStatictiscsParams";



export class SchedulingController {


    public async add_new_scheduling(request: Request, response: Response): Promise<Response> {

        try {

            const { citizenFullName,
                citizenEmail,
                citizenMobileNumber,
                schedulingDate,
                schedulingHour,
                categoryCode,
                serviceCode } = request.body;


            const params = new SchedulingParams(citizenFullName, citizenEmail, citizenMobileNumber, schedulingDate, schedulingHour, categoryCode, serviceCode);

            logger.info("[SchedulingController] Perform dependency injection for ISchedulingEngine")
            const schedulingEngine = container.resolve<ISchedulingEngine>("ISchedulingEngine")
            const result = await schedulingEngine.add_new_scheduling(params)

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
                logger.error("[SchedulingController] Error while adding new scheduling", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }
    public async get_scheduling_list(request: Request, response: Response): Promise<Response> {

        try {

            const { beginSchedulingDate,
                endSchedulingDate,
                categoryCode,
                serviceCode,
                schedulingStatus,
                orderColumn,
                direction,
                pageNumber,
                pageSize } = request.query;

            const authenticationToken = AuthValidator.checkAuthorizationToken(request);

            const params = new GetSchedulingListParams(
                authenticationToken,
                beginSchedulingDate as string,
                endSchedulingDate as string,
                categoryCode as string,
                serviceCode as string,
                schedulingStatus as SchedulingStatusEnum,
                orderColumn as string,
                direction as DirectionEnum,
                parseInt(pageNumber as string, 10) || 1,
                parseInt(pageSize as string, 10) || 10
            );


            logger.info("[SchedulingTimeController] Perform dependency injection for ISchedulingTimeEngine")
            const schedulingEngine = container.resolve<ISchedulingEngine>("ISchedulingEngine")
            const result = await schedulingEngine.get_scheduling_list(params)

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
                logger.error("[SchedulingController] Error while getting scheduling list", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

    // service for BO collaborator Only
    public async get_scheduling_detail(request: Request, response: Response): Promise<Response> {

        try {

            const id = parseInt(request.params.id);

            if (isNaN(id)) {
                throw new InvalidParametersException(Field.SCHEDULING_ID, MiddlewareBusinessMessage.SCHEDULING_ID_INVALID)
            }

            const authenticationToken = AuthValidator.checkAuthorizationToken(request);
            const params = new GetSchedulingDetailParams(authenticationToken, id);

            logger.info("[SchedulingController] Perform dependency injection for ISchedulingEngine")
            const schedulingEngine = container.resolve<ISchedulingEngine>("ISchedulingEngine")
            const result = await schedulingEngine.get_scheduling_detail(params)

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
                logger.error("[SchedulingController] Error while getting schedilng detail", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

    public async change_scheduling_status(request: Request, response: Response): Promise<Response> {

        try {

            const id = parseInt(request.params.id);

            if (isNaN(id)) {
                throw new InvalidParametersException(Field.SCHEDULING_ID, MiddlewareBusinessMessage.SCHEDULING_ID_INVALID)
            }

            const {schedulingStatusCode } = request.body;

            const authenticationToken = AuthValidator.checkAuthorizationToken(request);
            const params = new ChangeSchedulingStatusParams(authenticationToken, id, schedulingStatusCode as SchedulingStatusEnum);

            logger.info("[SchedulingController] Perform dependency injection for ISchedulingEngine")
            const schedulingEngine = container.resolve<ISchedulingEngine>("ISchedulingEngine")
            const result = await schedulingEngine.change_scheduling_status(params)

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
                logger.error("[SchedulingController] Error while changing scheduling status", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

    public async update_scheduling(request: Request, response: Response): Promise<Response> {

        try {


            const shcedulingId = parseInt(request.params.id);

            if (isNaN(shcedulingId)) {
                throw new InvalidParametersException(Field.SCHEDULING_ID, MiddlewareBusinessMessage.SCHEDULING_ID_INVALID)
            }


            const {schedulingDate,
                schedulingHour,
                categoryCode,
                serviceCode } = request.body;

            const authenticationToken = AuthValidator.checkAuthorizationToken(request);

            const params = new UpdateSchedulingParams(authenticationToken, shcedulingId,
                schedulingDate,
                schedulingHour,
                categoryCode as string,
                serviceCode  as string );

            logger.info("[SchedulingController] Perform dependency injection for ISchedulingEngine")
            const schedulingEngine = container.resolve<ISchedulingEngine>("ISchedulingEngine")
            const result = await schedulingEngine.update_scheduling(params)

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
                logger.error("[SchedulingController] Error while updating scheduling", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }
    public async get_scheduling_statistics(request: Request, response: Response): Promise<Response> {

        try {

   
            const authenticationToken = AuthValidator.checkAuthorizationToken(request);
            const params = new GetSchedulingStatistiscsParams(authenticationToken);

            logger.info("[SchedulingController] Perform dependency injection for ISchedulingEngine")
            const schedulingEngine = container.resolve<ISchedulingEngine>("ISchedulingEngine")
            const result = await schedulingEngine.get_scheduling_statistics(params)

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
                logger.error("[SchedulingController] Error while gettingscheduling statistics", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }
}
export default { SchedulingController }