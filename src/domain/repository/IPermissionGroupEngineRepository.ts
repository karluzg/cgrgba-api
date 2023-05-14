import { PermissionGroup } from "../model/PermissionGroup";


export interface IPermissionGroupEngineRepository {
    savePermissionGroup(permissionGroup: PermissionGroup): Promise<PermissionGroup>
    findPermissionGroupByCode(permissionGroupCode: string): Promise<PermissionGroup>
}
