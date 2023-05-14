import { TokenSession } from "../model/TokenSession";
import { User } from "../model/User";

export interface IUserEngineRepository{
    saveUser(user:User): Promise<User>;
    findUserByMobileNumber(userMobileNumber: string): Promise<User>;
    saveUser(user: User): Promise<User>
    findUserById(userId: number): Promise<User>
    updateUser(id: number, updateUserData: User): Promise<User>
    findUserByEmail(userEmail: string): Promise<User>
    updateUserPassword(userId: number, newPassword: string): Promise<User>
    findAllUsers(page: number, size: number, status?: string): Promise<User[]> 
}