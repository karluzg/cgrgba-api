import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { injectable } from "tsyringe";

import { IPermissionEngine } from "../IPermissionEngine";
import { GetByEmailOrCodeParams } from "../../../application/model/GetByEmailOrCodeParams";
import { PageAndSizeParams } from "../../../application/model/PageAndSizeParams";
import { PermissionGroupParams } from "../../../application/model/user-manager/PermissionGroupParams";
import { PermissionGroupResult } from "../../../application/model/user-manager/PermissionGroupResult";
import { PermissionGroupResultList } from "../../../application/model/user-manager/PermissionGroupResultList";
import { PermissionParams } from "../../../application/model/user-manager/PermissionParams ";
import { PermissionResult } from "../../../application/model/user-manager/PermissionResult";
import { PermissionResultList } from "../../../application/model/user-manager/PermissionResultList";
import { AddPermissionGroupOperation } from "../../operation/user-manager/permission/AddPermissionGroupOperation";
import { AddPermissionOperation } from "../../operation/user-manager/permission/AddPermissionOperation";
import { GetAllPermissionGroupOperation } from "../../operation/user-manager/permission/GetAllPermissionGroupOperation";
import { GetAllPermissionOperation } from "../../operation/user-manager/permission/GetAllPermissionOperation";
import { GetPermissionByCodeOperation } from "../../operation/user-manager/permission/GetPermissionByCodeOperation";
import { GetPermissionGrouByCodeOperation } from "../../operation/user-manager/permission/GetPermissionGrouByCodeOperation";


@injectable()
export class PermissionEngineImpl extends GenericOperationTemplate implements IPermissionEngine {
    async getPermissionByCode(params: GetByEmailOrCodeParams): Promise<PermissionResult> {
        return await this.executeOperation(new GetPermissionByCodeOperation(), params)
    }
    async addPermission(params: PermissionParams): Promise<PermissionResult> {
        return await this.executeOperation(new AddPermissionOperation(), params)
    }
    async getAllPermission(params: PageAndSizeParams): Promise<PermissionResultList> {
        return await this.executeOperation(new GetAllPermissionOperation(), params)
    }
    async getPermissionGroupByCode(params: GetByEmailOrCodeParams): Promise<PermissionGroupResult> {
        return await this.executeOperation(new GetPermissionGrouByCodeOperation(), params)
    }
    async addPermissionGroup(params: PermissionGroupParams): Promise<PermissionGroupResult> {
        return await this.executeOperation(new AddPermissionGroupOperation(), params)
    }
    async getAllPermissionGroup(params: PageAndSizeParams): Promise<PermissionGroupResultList> {
        return await this.executeOperation(new GetAllPermissionGroupOperation(), params)
    }


}
