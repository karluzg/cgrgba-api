import { Permission } from "../../domain-model/user-manager/permission/Persmission";
import { User } from "../../domain-model/user/User";


export interface IPermissionEngineRepository{
    findByPermissionId(permissionId:number): Promise<Permission | null>
    isUserOperationAllowed(operationId:number,userId:number): Promise<boolean | false >

}