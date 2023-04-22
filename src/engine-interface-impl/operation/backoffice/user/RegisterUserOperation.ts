import { GenericOperation } from "../../GenericOperation";
import { RegisterUserParams } from "../../../../engine-interface/params/user/RegisterUserParams";
import { RegisterUserResult } from "../../../../engine-interface/result/user/RegisterUserResult";
import { OperationNames } from "../../OperationNames";
import logger from "../../../../common/config/logger";
import { NotImplementedException } from "../../../../common/exceptions/NotImplementedException";


export class RegisterUserOperation extends GenericOperation<RegisterUserParams, RegisterUserResult>{
   
    constructor(){
        super(new OperationNames().create_user)

    }
   
    protected doExecute(params: RegisterUserParams, result: RegisterUserResult) {
        logger.info("WAIT FORR THE IMPLEMENTATION")
        throw new NotImplementedException("Method not implemented.");
    }
    protected newResult(): RegisterUserResult {
        throw new NotImplementedException("Method not implemented.");
    }

}
   