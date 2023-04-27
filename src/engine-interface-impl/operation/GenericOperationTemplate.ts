
import logger from "../../common/config/logger";
import { ErrorExceptionClass } from "../../common/exceptions/ErrorExceptionClass";
import { InvalidParametersException } from "../../common/exceptions/InvalidParametersException";
import { NotImplementedException } from "../../common/exceptions/NotImplementedException";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import { Result } from "../../engine-interface/Result";
 import { IOperation } from "./IOperation";


export abstract class GenericOperationTemplate{

    public executeOperation<R extends Result,P>(operation:IOperation<R,P>, params: P ): R  { 

        try {

            logger.info("Begin Operation "+JSON.stringify(operation));

           return operation.execute(params)

        } catch (error) {
            if(error.errorClasse===ErrorExceptionClass.NOT_IMPLEMENTED){
            throw new NotImplementedException(error.message)
          
        }else if(error.errorClasse===ErrorExceptionClass.INVALID_PARAMETERS){
                throw new InvalidParametersException(error.message)
    
         }else if(error.errorClasse===ErrorExceptionClass.UNAUTHORIZED){
        throw new UnauthorizedOperationException(error.message)
}
}finally{
    logger.info("End executing Operation "+JSON.stringify(operation));
}
}
}