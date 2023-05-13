
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { ForbiddenOperationException } from "../../../infrestructure/exceptions/ForbiddenOperationException";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import logger from "../../../infrestructure/config/logger";
import { HttpCode } from "../../../infrestructure/response/enum/HttpCode";
import { SchedulingParams } from "../../model/scheduling-manager/scheduling/SchedulingParams";
import { ISchedulingEngine } from "../../../domain/service/ISchedulingEngine";


export class SchedulingController {


    public async add_new_scheduling(request: Request, response: Response): Promise<Response> {

        try {

            const { citizenFullName, citizenEmail, citizenMobileNumber, schedulingDate, schedulingHour, schedulingCategory, schedulingService } = request.body;


            const params = new SchedulingParams(citizenFullName, citizenEmail, citizenMobileNumber, schedulingDate, schedulingHour, schedulingCategory, schedulingService);

            logger.info("[SchedulingController] Perform dependency injection for ISchedulingEngine")
            const schedulingEngine = container.resolve<ISchedulingEngine>("ISchedulingEngine")
            const result = await schedulingEngine.add_new_scheduling(params)

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
                logger.error("[SchedulingController] Error while adding new time slot", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }
}
export default { SchedulingController }





