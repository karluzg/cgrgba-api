import { TokenSession } from "../../../domain/model/TokenSession";
import { User } from "../../../domain/model/User";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class UserLoginResult extends ResultTemplate {


    private token: TokenSession;

    public get getToken(): TokenSession {
        return this.token;
    }
    public set setToken(value: TokenSession) {
        this.token = value;
    }


}