import { IUserEngine } from "../IUserEngine";
import { UserParams } from "../../../application/model/user-manager/UserParams";
import { UserResult } from "../../../application/model/user-manager/UserResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { AddUserOperation } from "../../operation/user-manager/user/AddUserOperation";
import { injectable } from "tsyringe";


@injectable()
export class UserEngineImpl extends GenericOperationTemplate implements IUserEngine {

    async addUser(params: UserParams): Promise<UserResult> {

        return await this.executeOperation(new AddUserOperation(), params)

    }

}
