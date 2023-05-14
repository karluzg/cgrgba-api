import { Role } from "../model/Role";
import { TokenSession } from "../model/TokenSession";
import { User } from "../model/User";

export interface IRoleEngineRepository{
    saveRole(role: Role): Promise<Role>
    findRoleByName(roleName: string): Promise<Role>
}