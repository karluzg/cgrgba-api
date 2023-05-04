import { Permission } from "../model/Permission";


export interface IPermissionEngineRepository {
    findByPermissionId(permissionId: number): Promise< Permission>
    isUserOperationAllowed(operationId: number, userId: number): Promise< boolean>
}