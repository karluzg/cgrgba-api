import { AuthParamsTemplate } from "../../../../infrestructure/template/AuthParamsTemplate";
export class GetRolesParams extends AuthParamsTemplate{
    constructor(authentication: string) {
        super(authentication)
    }

}