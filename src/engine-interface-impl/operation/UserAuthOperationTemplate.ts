import { Result } from "../../engine-interface/Result";
import { AuthParams } from "../../engine-interface/AuthParams";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import { OperationValidatorManager } from "../managers/OperationValidatorManager";
import { TokenSession } from "../../domain-model/TokenSession";
import { AuthenticationOperationTemplate } from "./AuthenticationOperationTemplate";
import logger from "../../common/config/logger";



export abstract class UserAuthOperationTemplate<R extends Result, P extends AuthParams> extends AuthenticationOperationTemplate<R,P>{


    protected operationValidatorManager:OperationValidatorManager


       constructor(operationId:number, operationValidatorManager:OperationValidatorManager ){
       super(operationId)
       this.operationValidatorManager=operationValidatorManager
       }


       protected doAuthExecute(tokenSession: TokenSession, params: P, result: R): void {
           
        this.operationValidatorManager.isOperationAllowed(tokenSession, this).then((operationAllowed)=>{
            logger.info("Validar se o utilizador tem permissão para executar a operação")
            if(!operationAllowed){ 
             throw new UnauthorizedOperationException("Operação não permetida")
            }
            this.doUserAuthExecuted(tokenSession,params,result)
        })

       }

       protected abstract  doUserAuthExecuted(tokenSession:TokenSession, params:P, result:R): void;


}

 


