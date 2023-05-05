import { PermissionGroup } from "../model/PermissionGroup";
import { Permission } from "../model/Persmission";


export interface IPermissionGroupEngineRepository {
    savePermissionGroup(permissionGroup: PermissionGroup): Promise<PermissionGroup>
    finPermissionGroupByCode(permissionGroupCode: string): Promise<PermissionGroup>
}
