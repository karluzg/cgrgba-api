import { IPage } from "../../infrestructure/pageable-manager/IPage";
import { PermissionGroup } from "../model/PermissionGroup";


export interface IPermissionGroupEngineRepository {
    savePermissionGroup(permissionGroup: PermissionGroup): Promise<PermissionGroup>
    findPermissionGroupByCode(permissionGroupCode: string): Promise<PermissionGroup>
    updatePermissionGroup(id: number, updatedData: PermissionGroup): Promise<PermissionGroup>
    deletePermissionGroup(id: number): Promise<void>
    findAllPermissionGroups(page: number, size: number, orderColumn?: string, direction?: 'ASC' | 'DESC'): Promise<IPage<PermissionGroup>> 
}
