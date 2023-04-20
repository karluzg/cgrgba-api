import logger from "../../common/config/logger";
import { IOperation } from "./IOperation";
import { Params } from "./Params";
import { Result } from "../../common/response/Result";


export abstract class GenericOperation <P extends Params,R extends Result> implements IOperation<R,P>{
   
  
    private operationName:string
    protected abstract doExecute(params:P, result:R );
    protected abstract newResult(): R;
    protected  doValidateParameters(params:P ):void { }

    constructor(operationName:string ){
        this.operationName=operationName;
    }

    validateParams(params: P): void {
        this.doValidateParameters(params)
    }
    execute(params: P): R {
     
        let result:R=this.newResult();
      
       try {
        this.validateParams(params);

            logger.info("[OPERATION] begin executing operation:" + this.operationName);
           this.doExecute(params, result);

           return result;
            


        } catch (error) {
            logger.error("Error while executing operation:" + " " +  this.operationName);
            throw new Error(error);
        }
    }


}
