import { RoleStatus } from "../model/RoleStatus";

export interface IRoleStatusEngineRepository {
    save(roleStatus: RoleStatus): Promise<void> 
    findRoleStatusCode(statusCode: string): Promise<RoleStatus>
}