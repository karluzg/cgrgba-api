import { AuthParamsTemplate } from "../../../infrestructure/template/AuthParamsTemplate"
import { ParamsTemplate } from "../../../infrestructure/template/ParamsTemplate"


export class UserLoginParams extends ParamsTemplate {

    private userPassword: string
    private userEmail: string


    constructor(userEmail: string, userPassword: string) {
        super()
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