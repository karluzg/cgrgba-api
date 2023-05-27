import { Request, Response } from "express";
import logger from "../../../infrestructure/config/logger";
import { HttpCode } from "../../../infrestructure/response/enum/HttpCode";
import { container } from "tsyringe";
import { ILovsEngine } from "../../../domain/service/ILovsEngine";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { ForbiddenOperationException } from "../../../infrestructure/exceptions/ForbiddenOperationException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { CategoryParams } from "../../model/lovs/CategoryParams";
export class Lovs {




    public async get_service_by_category(request: Request, response: Response): Promise<Response> {

        try {

            const { categoryCode } = request.body;


            console.info("[get_time_slot_list] INPUT DATE PARAMS RECEIVED %s" + categoryCode)
            const params = new CategoryParams(categoryCode);

            logger.info("[SchedulingTimeController] Perform dependency injection for ISchedulingTimeEngine")
            const schedulingTimeEngine = container.resolve<ILovsEngine>("ILovsEngine")
            const result = await schedulingTimeEngine.get_service_by_categry(params)

            return response.status(HttpCode.OK).json(result)

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
                logger.error("[SchedulingTimeHourController] Error while getting time slot list", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

}