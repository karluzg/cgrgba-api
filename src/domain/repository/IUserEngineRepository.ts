import { TokenSession } from "../model/TokenSession";
import { User } from "../model/User";

export interface IUserEngineRepository{
    saveUser(user:User): Promise<User>;
    findUserByEmail(userEmail:string):Promise<User>;
}