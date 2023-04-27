import { IUserEngine } from "../../engine-interface/IUserEngine";
import { RegisterUserParams } from "../../engine-interface/params/user/RegisterUserParams";
import { RegisterUserResult } from "../../engine-interface/result/user/RegisterUserResult";
import { GenericOperationTemplate } from "../operation/GenericOperationTemplate";
import { RegisterUserOperation } from "../operation/backoffice/user/RegisterUserOperation";
import { injectable } from "tsyringe";


@injectable()
export class UserEngineImpl extends GenericOperationTemplate implements IUserEngine{

    register_user(params: RegisterUserParams): RegisterUserResult {
    
            return  this.executeOperation(new RegisterUserOperation(), params)

    }
}
