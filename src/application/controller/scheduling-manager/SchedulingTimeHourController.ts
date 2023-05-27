
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { ForbiddenOperationException } from "../../../infrestructure/exceptions/ForbiddenOperationException";
import { UnsuccessfullOperationException } from "../../../infrestructure/exceptions/UnsuccessfullOperationException";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ErrorExceptionClass } from "../../../infrestructure/exceptions/ErrorExceptionClass";
import { ISchedulingTimeEngine } from "../../../domain/service/ISchedulingTimeEngine";
import { TimeSlotParams } from "../../model/scheduling-manager/schedulingTime/params/TimeSlotParams";
import logger from "../../../infrestructure/config/logger";
import { AuthValidator } from "../validator/AuthValidator";
import { HttpCode } from "../../../infrestructure/response/enum/HttpCode";
import { TimeSlotListParams } from "../../model/scheduling-manager/schedulingTime/params/TimeSlotListParams";


export class SchedulingTimeController {



    public async add_new_time_slot(request: Request, response: Response): Promise<Response> {

        try {


            const { beginSchedulingDate, endSchedulingDate, beginWorkTime, endWorkTime, beginLunchTime,
                endLunchTime, serviceInterval, availableCollaboratorNumber } = request.body;

            const authenticationToken = AuthValidator.checkAuthorizationToken(request);

            const params = new TimeSlotParams(authenticationToken, beginSchedulingDate,
                endSchedulingDate, beginWorkTime, endWorkTime, beginLunchTime, endLunchTime, serviceInterval, availableCollaboratorNumber);

            logger.info("[SchedulingTimeController] Perform dependency injection for ISchedulingTimeEngine")
            const schedulingTimeEngine = container.resolve<ISchedulingTimeEngine>("ISchedulingTimeEngine")

            const result = await schedulingTimeEngine.add_new_time_slot(params)

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
                throw new UnsuccessfullOperationException(error.field, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR + error)
            }
        }
    }

    public async get_time_slot_list(request: Request, response: Response): Promise<Response> {

        try {

            const { beginSchedulingDate } = request.body;


            console.info("[get_time_slot_list] INPUT DATE PARAMS RECEIVED %s" + beginSchedulingDate)
            const params = new TimeSlotListParams(beginSchedulingDate);

            logger.info("[SchedulingTimeController] Perform dependency injection for ISchedulingTimeEngine")
            const schedulingTimeEngine = container.resolve<ISchedulingTimeEngine>("ISchedulingTimeEngine")
            const result = await schedulingTimeEngine.get_time_slot_list(params)

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
export default { SchedulingTimeController: SchedulingTimeController }





