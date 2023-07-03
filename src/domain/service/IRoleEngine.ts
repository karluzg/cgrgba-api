import { GetByEmailOrCodeParams } from "../../application/model/GetByEmailOrCodeParams";
import { GetByIdParams } from "../../application/model/GetByIdParams";
import { PageAndSizeParams } from "../../application/model/PageAndSizeParams";
import { RoleParams } from "../../application/model/user-manager/RoleParams";
import { RoleResult } from "../../application/model/user-manager/RoleResult ";
import { RoleResultList } from "../../application/model/user-manager/RoleResultList";
import { ResultTemplate } from "../../infrestructure/template/ResultTemplate";

export interface IRoleEngine {
    getRoleByName(params: GetByEmailOrCodeParams): Promise<RoleResult>;
    getRoleById(params: GetByIdParams): Promise<RoleResult>;
    addRole(params: RoleParams): Promise<RoleResult>;
    getAllRoles(params: PageAndSizeParams): Promise<RoleResultList>;
}

