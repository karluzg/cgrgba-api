import { GenericOperation } from "../../../GenericOperation";
import { RegisterUserParams } from "../../../../../engine-interface/params/user/RegisterUserParams";
import { RegisterUserResult } from "../../../../../engine-interface/result/RegisterUserResult";
import { OperationNames } from "../../../OperationNames";
import logger from "../../../../../common/config/logger";


export class RegisterUserOperation extends GenericOperation<RegisterUserParams, RegisterUserResult>{
   
    constructor(){
        super(new OperationNames().create_user)

    }
   
    protected doExecute(params: RegisterUserParams, result: RegisterUserResult) {
        logger.info("WAIT FORR THE IMPLEMENTATION")
        throw new Error("Method not implemented.");
    }
    protected newResult(): RegisterUserResult {
        throw new Error("Method not implemented.");
    }

}
   