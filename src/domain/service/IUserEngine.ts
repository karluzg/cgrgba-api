import { ResetPasswordParams } from "../../application/model/user-manager/ResetPasswordParams";
import { UpdatePasswordParams } from "../../application/model/user-manager/UpdatePasswordParams";
import { UserParams } from "../../application/model/user-manager/UserParams";
import { UserResult } from "../../application/model/user-manager/UserResult";
import { ResultTemplate } from "../../infrestructure/template/ResultTemplate";

export interface IUserEngine {
    addUser(params: UserParams): Promise<UserResult>;
    updatePassword(params: UpdatePasswordParams): Promise<UserResult>;
    resetPassword(params:ResetPasswordParams):Promise<ResultTemplate>
}

