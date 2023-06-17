import { Role } from "../../../domain/model/Role";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class GetRolesResult extends ResultTemplate{
    private roles: Role[]

    constructor() {
        super();
        this.getSuccessfullyMessage();
    }

     get getRoles(): Role[]{
        return this.roles;
    }

     set setRoles (roles: Role[]){
         this.roles = roles;
    }

}