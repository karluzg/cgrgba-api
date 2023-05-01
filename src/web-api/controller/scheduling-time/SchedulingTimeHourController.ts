
import { NotImplementedException } from "../../../common/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../common/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../common/exceptions/UnauthorizedOperationException";
import { ForbiddenOperationException } from "../../../common/exceptions/ForbiddenOperationException";
import { UnsuccessfullOperationException } from "../../../common/exceptions/UnsuccessfullOperationException";
import { MiddlewareCustomErrorMessage } from "../../../common/response/MiddlewareCustomErrorMessage";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../common/exceptions/ErrorExceptionClass";
import { ISchedulingTimeHourEngine } from "../../../engine-interface/services/ISchedulingTimeHourEngine";
import { AddNewTimeSlotParams } from "../../../engine-interface/params/scheduling-time/AddNewTimeSlotParams";
import logger from "../../../common/config/logger";


export class SchedulingTimeHourController {

    public addNewTimeSlot(request: Request, response: Response): Response {

        try {

            const { authenticationToken, date, serviceInterval } = request.body;

            const params = new AddNewTimeSlotParams(authenticationToken, date, serviceInterval);

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





