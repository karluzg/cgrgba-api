import { IPage } from "../../infrestructure/pageable-manager/IPage";
import { TokenSession } from "../model/TokenSession";
import { User } from "../model/User";
import { UserStatus } from "../model/UserStatus";
import { UserStatusEnum } from "../model/enum/UserStatusEnum";

export interface IUserEngineRepository{
    findUserByMobileNumber(userMobileNumber: string): Promise<User>;
    saveUser(user: User): Promise<User>
    findUserById(userId: number): Promise<User>
    updateUser(id: number, updateUserData: User): Promise<User>
    findUserByEmail(userEmail: string): Promise<User>
    updateUserPassword(userId: number,passwordHash: string, passwordSalt: string, status:UserStatusEnum, passwordtry:number): Promise<User>
    findAllUsers(page: number, size: number, status?: UserStatus, orderColumn?: string, direction?: 'ASC' | 'DESC'): Promise<IPage<User>>


}