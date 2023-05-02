import { Permission } from "../model/Persmission";


export interface IPermissionEngineRepository {
    findByPermissionId(permissionId: number): Permission
    isUserOperationAllowed(operationId: number, userId: number): boolean;

}