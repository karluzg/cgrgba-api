
import logger from "../../infrestructure/config/logger";
import { ErrorExceptionClass } from "../exceptions/ErrorExceptionClass";
import { ForbiddenOperationException } from "../exceptions/ForbiddenOperationException";
import { InvalidParametersException } from "../exceptions/InvalidParametersException";
import { NotImplementedException } from "../exceptions/NotImplementedException";
import { UnauthorizedOperationException } from "../exceptions/UnauthorizedOperationException";
import { ResultTemplate } from "../template/ResultTemplate";
import { IOperation } from "../interface/IOperation";
import { ParamsTemplate } from "./../template/ParamsTemplate";
import { UnsuccessfullOperationException } from "../exceptions/UnsuccessfullOperationException";
import { MiddlewareBusinessMessage } from "../response/enum/MiddlewareCustomMessage";
import { Field } from "../exceptions/enum/Field";



export abstract class GenericOperationTemplate {

    public  async executeOperation<R extends ResultTemplate, P extends ParamsTemplate>(operation: IOperation<R, P>, params: P): Promise<R> {

        try {

            logger.info("[GenericOperationTemplate] Begin executing Operation", JSON.stringify(operation));

            return await operation.execute(params)

        } catch (error) {

            if (error.errorClasseName == ErrorExceptionClass.UNAUTHORIZED) {
                throw new UnauthorizedOperationException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.NOT_IMPLEMENTED) {
                throw new NotImplementedException(error.field, error.message)

            } else if (error.errorClasseName === ErrorExceptionClass.INVALID_PARAMETERS) {
                throw new InvalidParametersException(error.field, error.message)

            }
            else if (error.errorClasseName === ErrorExceptionClass.FORBIDDEN) {
                throw new ForbiddenOperationException(error.field, error.message)

            }
             else {

                logger.error("[GenericOperationTemplate] - Error while executing operation" + error)
                throw new UnsuccessfullOperationException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR)

            }
        } finally {
            logger.info("[GenericOperationTemplate] End executing Operation " + JSON.stringify(operation));
        }
    }
}