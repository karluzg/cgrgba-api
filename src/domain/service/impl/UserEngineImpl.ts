import { IUserEngine } from "../IUserEngine";
import { UserParams } from "../../../application/model/user-manager/UserParams";
import { UserResult } from "../../../application/model/user-manager/UserResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { AddUserOperation } from "../../operation/user-manager/AddUserOperation";
import { injectable } from "tsyringe";


@injectable()
export class UserEngineImpl extends GenericOperationTemplate implements IUserEngine {

    addUser(params: UserParams): UserResult {

        return this.executeOperation(new AddUserOperation(), params)

    }

}
