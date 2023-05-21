import { IUserEngine } from "../IUserEngine";
import { UserParams } from "../../../application/model/user-manager/UserParams";
import { UserResult } from "../../../application/model/user-manager/UserResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { AddUserOperation } from "../../operation/user-manager/user/AddUserOperation";
import { injectable } from "tsyringe";
import { UpdatePasswordParams } from "../../../application/model/user-manager/UpdatePasswordParams";

import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";
import { UpdatePasswordOperation } from "../../operation/user-manager/user/UpdatePasswordOperation";
import { ResetPasswordParams } from "../../../application/model/user-manager/ResetPasswordParams";
import { ResetPasswordOperation } from "../../operation/user-manager/user/ResetPasswordOperation";


@injectable()
export class UserEngineImpl extends GenericOperationTemplate implements IUserEngine {
  

    async addUser(params: UserParams): Promise<UserResult> {

        return await this.executeOperation(new AddUserOperation(), params)

    }

    async updatePassword(params: UpdatePasswordParams): Promise<UserResult> {
        return await this.executeOperation(new UpdatePasswordOperation(), params)
    }

    async resetPassword(params: ResetPasswordParams): Promise<ResultTemplate> {
        return await this.executeOperation(new ResetPasswordOperation(), params)
    }
  

}
