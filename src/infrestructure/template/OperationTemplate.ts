import logger from "../../infrestructure/config/logger";
import { IOperation } from "../interface/IOperation";
import { ParamsTemplate } from "./ParamsTemplate";
import { ResultTemplate } from "./ResultTemplate";
import { InvalidParametersException } from "../exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../exceptions/UnauthorizedOperationException";
import { NotImplementedException } from "../exceptions/NotImplementedException";
import { ErrorExceptionClass } from "../exceptions/ErrorExceptionClass";
import { UnsuccessfullOperationException } from "../exceptions/UnsuccessfullOperationException";
import { ForbiddenOperationException } from "../exceptions/ForbiddenOperationException";
import { throws } from "assert";
import { Field } from "../exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../response/enum/MiddlewareCustomErrorMessage";



export abstract class OperationTemplate<R extends ResultTemplate, P extends ParamsTemplate> implements IOperation<R, P>{


  protected abstract doExecute(params: P, result: R):Promise<void>;
  protected abstract initResult(): R;
  protected doValidateParameters(params: P): void { }

  protected operationId: number

  constructor(operationId: number) {
    this.operationId = operationId
  }

  validateParams(params: P): void {
    this.doValidateParameters(params)
  }


  async execute(params: P): Promise<R> {

    let result: R = this.initResult();

    this.validateParams(params);

    try {

      logger.info("[OperationTemplate] Begin executing operation:" + this.operationId)

      await this.doExecute(params, result);

      return result

    } catch (error) {



      if (error.errorClasseName == ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);

      } else if (error.errorClasseName == ErrorExceptionClass.FORBIDDEN) {
        throw new ForbiddenOperationException(error.field, error.message);
      }

      logger.error("[OperationTemplate] Error while executing operation %s", this.operationId)

      throw error
    } finally {
      logger.info("[OperationTemplate] End executing operation " + this.operationId)

    }
  }

  getOperationId(): number {
    return this.operationId
  }

}



