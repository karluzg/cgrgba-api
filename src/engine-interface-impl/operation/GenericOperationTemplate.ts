
import logger from "../../common/config/logger";
import { ErrorExceptionClass } from "../../common/exceptions/ErrorExceptionClass";
import { ForbiddenOperationException } from "../../common/exceptions/ForbiddenOperationException";
import { InvalidParametersException } from "../../common/exceptions/InvalidParametersException";
import { NotImplementedException } from "../../common/exceptions/NotImplementedException";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import { UnsuccessfullOperationException } from "../../common/exceptions/UnsuccessfullOperationException";
import { Result } from "../../engine-interface/Result";
import { IOperation } from "./IOperation";
import { Params } from "./Params";



export abstract class GenericOperationTemplate {

    public executeOperation<R extends Result, P extends Params>(operation: IOperation<R, P>, params: P): R {

        try {

            logger.info("[GenericOperationTemplate] Begin executing Operation", JSON.stringify(operation));

            return operation.execute(params)

        } catch (error) {
            logger.error("[GenericOperationTemplate] Error while executing operation", error)

            if (error.errorClasseName == ErrorExceptionClass.UNAUTHORIZED) {
                throw new UnauthorizedOperationException(error.field, error.message)

            }
            if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
                throw new NotImplementedException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(error.field, error.message)

            }
            else if (error.errorClasseName === ErrorExceptionClass.FORBIDDEN) {
                throw new ForbiddenOperationException(error.field, error.message)
            }
            else if (error.errorClasseName === ErrorExceptionClass.UNSUCCESSFULLY) {
                throw new UnsuccessfullOperationException(error.field, error.message)
            } else {
            }
        } finally {
            logger.info("[GenericOperationTemplate] End executing Operation " + JSON.stringify(operation));
        }
    }
}