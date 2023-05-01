import logger from "../../common/config/logger";
import { IOperation } from "./IOperation";
import { Params } from "./Params";
import { Result } from "../../engine-interface/Result";
import { InvalidParametersException } from "../../common/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import { NotImplementedException } from "../../common/exceptions/NotImplementedException";
import { ErrorExceptionClass } from "../../common/exceptions/ErrorExceptionClass";
import { UnsuccessfullOperationException } from "../../common/exceptions/UnsuccessfullOperationException";
import { ForbiddenOperationException } from "../../common/exceptions/ForbiddenOperationException";



export abstract class OperationTemplate<R extends Result, P extends Params> implements IOperation<R, P>{


  protected abstract doExecute(params: P, result: R);
  protected abstract newResult(): R;
  protected doValidateParameters(params: P): void { }

  protected operationId: number

  constructor(operationId: number) {
    this.operationId = operationId
  }

  validateParams(params: P): void {
    this.doValidateParameters(params)
  }


  execute(params: P): R {

    let result: R = this.newResult();

    this.validateParams(params);

    try {

      logger.info("[OperationTemplate] Begin executing operation:" + this.operationId)

      this.doExecute(params, result);

      return result

    } catch (error) {
      logger.info("[OperationTemplate] Error while executing operation ", error)


      if (error.errorClasseName == ErrorExceptionClass.UNAUTHORIZED) {
        throw new UnauthorizedOperationException(error.field, error.message);

      }

      if (error.errorClasseName == ErrorExceptionClass.FORBIDDEN) {
        throw new ForbiddenOperationException(error.field, error.message);
      }
    } finally {
      logger.info("[OperationTemplate] End executing operation:" + this.operationId)

    }
  }

  getOperationId(): number {
    return this.operationId
  }

}



