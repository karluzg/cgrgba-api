
import { NotImplementedException } from "../../../common/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../common/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../common/exceptions/UnauthorizedOperationException";
import { ForbiddenOperationException } from "../../../common/exceptions/ForbiddenOperationException";
import { UnsuccessfullOperationException } from "../../../common/exceptions/UnsuccessfullOperationException";
import { MiddlewareCustomErrorMessage } from "../../../common/response/CustomErrorMessage";
import { HttpCode } from "../../../common/response/HttpCode";
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
            logger.info("[SchedulingTimeHourController] Perform dependency injection for ISchedulingTimeHourEngine was successfully")

            const result = schedulingTimeHourEngine.add_new_time_slot(params)

            return response.status(HttpCode.OK).json(result)

        } catch (error) {

            logger.error("ENTROU NO ERRO NA API", error)
            if (error.errorClasse === ErrorExceptionClass.NOT_IMPLEMENTED) {
                throw new NotImplementedException(error.message)

            } else if (error.errorClasse === ErrorExceptionClass.FORBIDDEN) {
                throw new ForbiddenOperationException(error.message)

            } else if (error.errorClasse === ErrorExceptionClass.UNSUCCESSFULLY) {
                throw new UnsuccessfullOperationException(error.message)


            } else if (error.errorClasse === ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(error.message)

            } else if (error.errorClasse === ErrorExceptionClass.UNAUTHORIZED) {
                throw new UnauthorizedOperationException(error.message)
            } else {
                throw new UnsuccessfullOperationException(MiddlewareCustomErrorMessage.INTERNAL_SERVER_ERROR + error)
            }
        }
    }
}
export default { SchedulingTimeHourController }





