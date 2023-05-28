import { IPage } from "../../infrestructure/pageable-manager/IPage";
import { Permission } from "../model/Permission";


export interface IPermissionEngineRepository {
    findByPermissionId(permissionId: number): Promise< Permission>
    isUserOperationAllowed(operationId: number, userId: number): Promise< boolean>
    savePermission(permission: Permission): Promise<Permission>
    findPermissionByCode(permissionCode: string): Promise<Permission>
    findAllPermissions(page: number, size: number, orderColumn?: string, direction?: 'ASC' | 'DESC'): Promise<IPage<Permission>>
    deletePermission(id: number): Promise<void>
    updatePermission(permissionId: number, updatePermissionData: Permission): Promise<Permission>
}