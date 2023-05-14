import { Permission } from "../model/Permission";


export interface IPermissionEngineRepository {
    findByPermissionId(permissionId: number): Promise< Permission>
    isUserOperationAllowed(operationId: number, userId: number): Promise< boolean>
    savePermission(permission: Permission): Promise<Permission>
    findPermissionByCode(permissionCode: string): Promise<Permission>
    findAllPermissions(page: number, size: number): Promise<Permission[]>
    deletePermission(id: number): Promise<void>
    updatePermission(permissionId: number, updatePermissionData: Permission): Promise<Permission>
}