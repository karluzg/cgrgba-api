import { UserLoginParams } from "../../application/model/user-manager/UserLoginParams";
import { UserLoginResult } from "../../application/model/user-manager/UserLoginResult";
import { UserResult } from "../../application/model/user-manager/UserResult";

export interface ISessionEngine {
    login(params: UserLoginParams): Promise<UserLoginResult>;

}