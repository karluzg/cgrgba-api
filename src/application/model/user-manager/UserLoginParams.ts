import { AuthParamsTemplate } from "../../../infrestructure/template/AuthParamsTemplate"
import { ParamsTemplate } from "../../../infrestructure/template/ParamsTemplate"


export class UserLoginParams extends ParamsTemplate {

    private password: string
    private email: string


    constructor(email: string, password: string) {
        super()
        this.password = password
        this.email = email
    }

    get getPassword(): string {
        return this.password
    }
    get getEmail() {
        return this.email;
    }
}