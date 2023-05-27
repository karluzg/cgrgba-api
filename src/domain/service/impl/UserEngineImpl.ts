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
import { PageAndSizeParams } from "../../../application/model/PageAndSizeParams";
import { UserResultList } from "../../../application/model/user-manager/UserResultList";
import { GetAllUserOperation } from "../../operation/user-manager/user/GetAllUserOperation";
import { GetByIdParams } from "../../../application/model/GetByIdParams";
import { GetUserByIdOperation } from "../../operation/user-manager/user/GetUserByIdOperation";
import { GetByEmailOrCodeParams } from "../../../application/model/GetByEmailOrCodeParams";
import { GetUserByEmailOperation } from "../../operation/user-manager/user/GetUserByEmailOperation";


@injectable()
export class UserEngineImpl extends GenericOperationTemplate implements IUserEngine {
    async getUserByEmail(params: GetByEmailOrCodeParams): Promise<UserResult> {
        return await this.executeOperation(new GetUserByEmailOperation(), params)
    }
   
    async getUserById(params: GetByIdParams): Promise<UserResult> {
        return await this.executeOperation(new GetUserByIdOperation(), params)
    }

    async getAllUsers(params: PageAndSizeParams): Promise<UserResultList> {
        return await this.executeOperation(new GetAllUserOperation(), params)
    }
  
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
