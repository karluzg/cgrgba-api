
import logger from "../../common/config/logger";
import { Result } from "../../common/response/Result";
 import { IOperation } from "./IOperation";
 import { injectable, unmanaged } from 'inversify';



export abstract class GenericOperationTemplate{



    public executeOperation<R extends Result,P>(operation:IOperation<R,P>, params: P ): R  { 

  
        try {
            logger.debug("Begin Operation");

           return operation.execute(params)

        } catch (error) {
            logger.error("Error while executin operation"+ error);
        }finally {
            logger.debug("End Operation");
        }

}
}