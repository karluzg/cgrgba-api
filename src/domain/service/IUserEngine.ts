import { UserParams } from "../../application/model/user-manager/UserParams";
import { UserResult } from "../../application/model/user-manager/UserResult";

export interface IUserEngine {
    register_user(params: UserParams): UserResult;

}

