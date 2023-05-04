import { Permission } from "../model/Persmission";


export interface IPermissionEngineRepository {
    findByPermissionId(permissionId: number): Promise< Permission>
    isUserOperationAllowed(operationId: number, userId: number): Promise< boolean>
    savePermission(permission: Permission): Promise<Permission>
    finPermissionByCode(permissionCode: string): Promise<Permission>
}