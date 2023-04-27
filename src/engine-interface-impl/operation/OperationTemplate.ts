import logger from "../../common/config/logger";
import { IOperation } from "./IOperation";
import { Params } from "./Params";
import { Result } from "../../engine-interface/Result";
import { InvalidParametersException } from "../../common/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import { NotImplementedException } from "../../common/exceptions/NotImplementedException";



export abstract class OperationTemplate <R extends Result, P extends Params> implements IOperation<R,P>{
 
  
    protected abstract doExecute(params:P, result:R );
    protected abstract newResult(): R;
    protected doValidateParameters(params:P ):void { }

    protected operationId:number

  constructor(operationId:number){
    this.operationId=operationId
  }

    validateParams(params: P): void {
        this.doValidateParameters(params)
    }
    execute(params: P): R {
     
        let result:R=this.newResult();
      
       try {
        this.validateParams(params);

           
           this.doExecute(params, result);

           return result;
            
        } catch (error) {

        if(error instanceof NotImplementedException){
            throw new NotImplementedException(error.message);
        }
        else if( error instanceof InvalidParametersException){
                throw new InvalidParametersException(error.message);
           
            } else if( error instanceof UnauthorizedOperationException){
                throw new UnauthorizedOperationException(error.message);
           
        }
    }
}

getOperationId(): number {
  return this.operationId
}

}



