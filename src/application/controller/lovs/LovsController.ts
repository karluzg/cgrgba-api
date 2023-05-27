import { Request, Response } from "express";
import logger from "../../../infrestructure/config/logger";
export class Lovs {




    public async get_service_by_category(request: Request, response: Response): Promise<Response> {

        try {

            const { categoryCode } = request.body;


            console.info("[get_time_slot_list] INPUT DATE PARAMS RECEIVED %s" + categoryCode)
            const params = new CategoryParams(categoryCode);

            logger.info("[SchedulingTimeController] Perform dependency injection for ISchedulingTimeEngine")
            const schedulingTimeEngine = container.resolve<ILovsEngine>("ILovsEngine")
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