import { AuthParamsTemplate } from "../../../infrestructure/template/AuthParamsTemplate"


export class UserLoginParams extends AuthParamsTemplate {

    private userPassword: string
    private userEmail: string


    constructor(userEmail: string, userPassword: string) {
        super(null)
        this.userPassword = userPassword
        this.userEmail = userEmail
    }

    get getuserPassword(): string {
        return this.userPassword
    }
    get getUserEmail() {
        return this.userEmail;
    }
}