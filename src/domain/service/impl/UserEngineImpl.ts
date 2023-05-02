import { IUserEngine } from "../IUserEngine";
import { UserParams } from "../../../application/model/user-manager/UserParams";
import { UserResult } from "../../../application/model/user-manager/UserResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { RegisterUserOperation } from "../../operation/user-manager/RegisterUserOperation";
import { injectable } from "tsyringe";


@injectable()
export class UserEngineImpl extends GenericOperationTemplate implements IUserEngine {

    register_user(params: UserParams): UserResult {

        return this.executeOperation(new RegisterUserOperation(), params)

    }

}
