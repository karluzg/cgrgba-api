import { GetByEmailOrCodeParams } from "../../application/model/GetByEmailOrCodeParams";
import { GetAllUsersParams } from "../../application/model/GetAllUserSParams";
import { PermissionGroupParams } from "../../application/model/user-manager/PermissionGroupParams";
import { PermissionGroupResult } from "../../application/model/user-manager/PermissionGroupResult";
import { PermissionGroupResultList } from "../../application/model/user-manager/PermissionGroupResultList";
import { PermissionParams } from "../../application/model/user-manager/PermissionParams ";
import { PermissionResult } from "../../application/model/user-manager/PermissionResult";
import { PermissionResultList } from "../../application/model/user-manager/PermissionResultList";

export interface IPermissionEngine {
    getPermissionByCode(params: GetByEmailOrCodeParams): Promise<PermissionResult>;
    addPermission(params: PermissionParams): Promise<PermissionResult>;
    getAllPermission(params: GetAllUsersParams): Promise<PermissionResultList>;
    getPermissionGroupByCode(params: GetByEmailOrCodeParams): Promise<PermissionGroupResult>;
    addPermissionGroup(params: PermissionGroupParams): Promise<PermissionGroupResult>;
    getAllPermissionGroup(params: GetAllUsersParams): Promise<PermissionGroupResultList>;
}

