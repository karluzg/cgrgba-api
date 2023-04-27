import { OperationTemplate } from "../../OperationTemplate";
import { RegisterUserParams } from "../../../../engine-interface/params/user/RegisterUserParams";
import { RegisterUserResult } from "../../../../engine-interface/result/user/RegisterUserResult";
import { OperationNames } from "../../OperationNames";
import logger from "../../../../common/config/logger";
import { UserAuthOperationTemplate } from "../../UserAuthOperationTemplate";
import { TokenSession } from "../../../../domain-model/session/TokenSession";
import { OperationValidatorManager } from "../../../managers/OperationValidatorManager";


export class RegisterUserOperation extends UserAuthOperationTemplate<RegisterUserResult, RegisterUserParams>{
  
      
    constructor(){
        super(OperationNames.CREATE_USER, new OperationValidatorManager())
    }
  

    protected doUserAuthExecuted(tokenSession: TokenSession, params: RegisterUserParams, result: RegisterUserResult): void {
        throw new Error("Method not implemented.");
    }
    protected newResult(): RegisterUserResult {
        throw new Error("Method not implemented.");
    }
  
  
  
  

  
  


}
   