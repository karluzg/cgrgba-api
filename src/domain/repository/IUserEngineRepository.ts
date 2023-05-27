import { TokenSession } from "../model/TokenSession";
import { User } from "../model/User";
import { UserStatusEnum } from "../model/enum/UserStatusEnum";

export interface IUserEngineRepository{
    findUserByMobileNumber(userMobileNumber: string): Promise<User>;
    saveUser(user: User): Promise<User>
    findUserById(userId: number): Promise<User>
    updateUser(id: number, updateUserData: User): Promise<User>
    findUserByEmail(userEmail: string): Promise<User>
    updateUserPassword(userId: number,passwordHash: string, passwordSalt: string, status:UserStatusEnum, passwordtry:number): Promise<User>
    findAllUsers(page: number, size: number, status?: string): Promise<User[]> 
}