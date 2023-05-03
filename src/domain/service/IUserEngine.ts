import { UserParams } from "../../application/model/user-manager/UserParams";
import { UserResult } from "../../application/model/user-manager/UserResult";

export interface IUserEngine {
    addUser(params: UserParams): UserResult;

}

