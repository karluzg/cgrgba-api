import { PermissionGroup } from "../model/PermissionGroup";


export interface IPermissionGroupEngineRepository {
    savePermissionGroup(permissionGroup: PermissionGroup): Promise<PermissionGroup>
    finPermissionGroupByCode(permissionGroupCode: string): Promise<PermissionGroup>
}
