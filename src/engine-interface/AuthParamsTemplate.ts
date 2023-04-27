import { AuthParams } from "./AuthParams";

export class AuthParamsTemplate implements AuthParams{

    private authentication:string

    constructor(authentication:string){
        this.authentication=authentication
    }

    getAuthenticationToken(): string {
    return this.authentication
    }
    
}