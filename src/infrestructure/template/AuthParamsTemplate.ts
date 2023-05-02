import { IAuthParams } from "../interface/IAuthParams";

export class AuthParamsTemplate implements IAuthParams{

    private authentication:string

    constructor(authentication:string){
        this.authentication=authentication
    }

    getAuthenticationToken(): string {
    return this.authentication
    }
    
}