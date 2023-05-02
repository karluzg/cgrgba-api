
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { ForbiddenOperationException } from "../../../infrestructure/exceptions/ForbiddenOperationException";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { MiddlewareCustomErrorMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { ISchedulingTimeHourEngine } from "../../../domain/service/ISchedulingTimeHourEngine";
import { TimeSlotParams } from "../../../application/model/scheduling-manager/TimeSlotParams";
import logger from "../../../infrestructure/config/logger";


export class SchedulingTimeHourController {

    public addNewTimeSlot(request: Request, response: Response): Response {

        try {

            const { authenticationToken, date, serviceInterval } = request.body;

            const params = new TimeSlotParams(authenticationToken, date, serviceInterval);

            logger.info("[SchedulingTimeHourController] Perform dependency injection for ISchedulingTimeHourEngine")
            const schedulingTimeHourEngine = container.resolve<ISchedulingTimeHourEngine>("ISchedulingTimeHourEngine")

            const result = schedulingTimeHourEngine.add_new_time_slot(params)

            return response.status(200).json(result)

        } catch (error) {

            logger.error("[SchedulingTimeHourController] Error while adding new time slot", error)
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
                throw new UnsuccessfullOperationException(error.field, MiddlewareCustomErrorMessage.INTERNAL_SERVER_ERROR + error)
            }
        }
    }
}
export default { SchedulingTimeHourController }





