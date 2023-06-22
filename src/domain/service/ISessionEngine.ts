import { UserLoginParams } from "../../application/model/user-manager/UserLoginParams";
import { UserLoginResult } from "../../application/model/user-manager/UserLoginResult";
import { UserLogoutParams } from "../../application/model/user-manager/UserLogoutParams";
import { UserLogoutResult } from "../../application/model/user-manager/UserLogoutResult";

export interface ISessionEngine {
    logout(params: UserLogoutParams): Promise< UserLogoutResult>;
    login(params: UserLoginParams): Promise<UserLoginResult>;

}