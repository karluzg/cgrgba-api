import { TokenSession } from "../model/TokenSession";
import { User } from "../model/User";

export interface IUserEngineRepository{
    saveUser(user:User): User;

}