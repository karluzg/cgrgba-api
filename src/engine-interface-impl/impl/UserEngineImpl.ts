import { IUserEngine } from "../../engine-interface/IUserEngine";
import { RegisterUserParams } from "../../engine-interface/params/user/RegisterUserParams";
import { RegisterUserResult } from "../../engine-interface/result/RegisterUserResult";
import { GenericOperationTemplate } from "../operation/GenericOperationTemplate";
import { RegisterUserOperation } from "../operation/backoffice/post/user/RegisterUserOperation";
import { injectable, inject } from 'inversify';


export class UserEngineImpl extends GenericOperationTemplate implements IUserEngine{

    create_user(params: RegisterUserParams): RegisterUserResult {
    
            return  this.executeOperation(new RegisterUserOperation(), params)

    }
}
