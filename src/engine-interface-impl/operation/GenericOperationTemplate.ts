
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

            logger.info("Begin executing Operation " + JSON.stringify(operation));

            return operation.execute(params)

        } catch (error) {
            if (error.errorClasse === ErrorExceptionClass.NOT_IMPLEMENTED) {
                throw new NotImplementedException(error.message)

            } else if (error.errorClasse === ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(error.message)

            } else if (error.errorClasse === ErrorExceptionClass.UNAUTHORIZED) {
                throw new UnauthorizedOperationException(error.message)
            }
            else if (error.errorClasse === ErrorExceptionClass.FORBIDDEN) {
                throw new ForbiddenOperationException(error.message)
            }
            else if (error.errorClasse === ErrorExceptionClass.UNSUCCESSFULLY) {
                throw new UnsuccessfullOperationException(error.message)
            }
        } finally {
            logger.info("End executing Operation " + JSON.stringify(operation));
        }
    }
}