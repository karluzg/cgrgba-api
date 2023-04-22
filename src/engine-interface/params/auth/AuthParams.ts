export class AuthParams{

    private authenticationToken:string

    constructor(authenticationToken:string){
        this.authenticationToken=authenticationToken
    }

    get getAuthenticationToken():string{
        return this.authenticationToken
    }
}