import { Permission } from "../../domain-model/Persmission";


export interface IPermissionEngineRepository {
    findByPermissionId(permissionId: number): Promise<Permission | null>
    isUserOperationAllowed(operationId: number, userId: number): Promise<boolean | false>

}