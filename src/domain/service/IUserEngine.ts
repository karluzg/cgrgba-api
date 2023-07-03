import { GetByEmailOrCodeParams } from "../../application/model/GetByEmailOrCodeParams";
import { GetByIdParams } from "../../application/model/GetByIdParams";
import { PageAndSizeParams } from "../../application/model/PageAndSizeParams";
import { ResetPasswordParams } from "../../application/model/user-manager/ResetPasswordParams";
import { UpdatePasswordParams } from "../../application/model/user-manager/UpdatePasswordParams";
import { UserParams } from "../../application/model/user-manager/UserParams";
import { UserResult } from "../../application/model/user-manager/UserResult";
import { UserResultList } from "../../application/model/user-manager/UserResultList";
import { ResultTemplate } from "../../infrestructure/template/ResultTemplate";

export interface IUserEngine {
    getUserByEmail(params: GetByEmailOrCodeParams): Promise<UserResult>;
    getUserById(params: GetByIdParams): Promise<UserResult>;
    addUser(params: UserParams): Promise<UserResult>;
    updatePassword(params: UpdatePasswordParams): Promise<UserResult>;
    resetPassword(params:ResetPasswordParams):Promise<ResultTemplate>
    getAllUsers(params: PageAndSizeParams): Promise<UserResultList>;
}

