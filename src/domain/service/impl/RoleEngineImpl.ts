import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { injectable } from "tsyringe";

import { PageAndSizeParams } from "../../../application/model/PageAndSizeParams";
import { GetByIdParams } from "../../../application/model/GetByIdParams";
import { GetByEmailOrCodeParams } from "../../../application/model/GetByEmailOrCodeParams";
import { GetUserByEmailOperation } from "../../operation/user-manager/user/GetUserByEmailOperation";
import { IRoleEngine } from "../IRoleEngine";
import { RoleParams } from "../../../application/model/user-manager/RoleParams";
import { RoleResult } from "../../../application/model/user-manager/RoleResult ";
import { RoleResultList } from "../../../application/model/user-manager/RoleResultList";
import { GetRoleByIdOperation } from "../../operation/user-manager/role/GetRoleByIdOperation";
import { GetRoleByNameOperation } from "../../operation/user-manager/role/GetRoleByNameOperation";
import { GetAllRoleOperation } from "../../operation/user-manager/role/GetAllRoleOperation";
import { AddRoleOperation } from "../../operation/user-manager/role/AddRoleOperation";


@injectable()
export class RoleEngineImpl extends GenericOperationTemplate implements IRoleEngine {
    async getRoleByName(params: GetByEmailOrCodeParams): Promise<RoleResult> {
        return await this.executeOperation(new GetRoleByNameOperation(), params)
    }
    async getRoleById(params: GetByIdParams): Promise<RoleResult> {
        return  await this.executeOperation(new GetRoleByIdOperation(), params)
    }
    async addRole(params: RoleParams): Promise<RoleResult> {
        return await this.executeOperation(new AddRoleOperation(), params)
    }
    async getAllRoles(params: PageAndSizeParams): Promise<RoleResultList> {
        return await this.executeOperation(new GetAllRoleOperation(), params)
    }

}
