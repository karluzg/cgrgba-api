import { IPage } from "../../infrestructure/pageable-manager/IPage";
import { Permission } from "../model/Permission";
import { Role } from "../model/Role";

export interface IRoleEngineRepository{
    saveRole(role: Role): Promise<Role>
    findRoleByName(roleName: string): Promise<Role>
    findRoleById(roleId: number): Promise<Role >
    findRolesBy(page: number, size: number, orderColumn?: string, direction?: 'ASC' | 'DESC'): Promise<IPage<Role>>
    updateRole(roleId: number, updateRoleData: Role): Promise<Role>
    deleteRole(id: number): Promise<void>
    addPermissionToRole(roleId: number, permissionCode: string): Promise<Role>
    removePermissionFromRole(roleId: number, permissionCode: string): Promise<Role>
    getRolePermissions(roleId: number): Promise<Permission[]>
    getAllRoles():Promise<Role[]>
}