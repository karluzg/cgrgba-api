import { Permission } from "../model/Permission";
import { Role } from "../model/Role";
import { TokenSession } from "../model/TokenSession";
import { User } from "../model/User";

export interface IRoleEngineRepository{
    saveRole(role: Role): Promise<Role>
    findRoleByName(roleName: string): Promise<Role>
    findRoleById(roleId: number): Promise<Role >
    findAllRoles(page: number, size: number): Promise<Role[]>
    updateRole(roleId: number, updateRoleData: Role): Promise<Role>
    deleteRole(id: number): Promise<void>
    addPermissionToRole(roleId: number, permissionCode: string): Promise<Role>
    removePermissionFromRole(roleId: number, permissionCode: string): Promise<Role>
    getRolePermissions(roleId: number): Promise<Permission[]>
}