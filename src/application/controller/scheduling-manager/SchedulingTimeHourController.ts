
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { ForbiddenOperationException } from "../../../infrestructure/exceptions/ForbiddenOperationException";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { ISchedulingTimeHourEngine } from "../../../domain/service/ISchedulingTimeHourEngine";
import { TimeSlotParams } from "../../../application/model/scheduling-manager/TimeSlotParams";
import logger from "../../../infrestructure/config/logger";
import { AuthValidator } from "../validator/AuthValidator";
import { HttpCode } from "../../../infrestructure/response/enum/HttpCode";


export class SchedulingTimeHourController {

    public async add_new_time_slot(request: Request, response: Response): Promise<Response> {

        try {

            const { schedulingDate, serviceInterval } = request.body;

            const authenticationToken = AuthValidator.checkAuthorizationToken(request);

            const params = new TimeSlotParams(authenticationToken, schedulingDate, serviceInterval);

            logger.info("[SchedulingTimeHourController] Perform dependency injection for ISchedulingTimeHourEngine")
            const schedulingTimeHourEngine = container.resolve<ISchedulingTimeHourEngine>("ISchedulingTimeHourEngine")

            const result = await schedulingTimeHourEngine.add_new_time_slot(params)

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
                logger.error("[SchedulingTimeHourController] Error while adding new time slot", error)
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.INTERNAL_SERVER_ERROR + error)
            }
        }
    }
}
export default { SchedulingTimeHourController }





