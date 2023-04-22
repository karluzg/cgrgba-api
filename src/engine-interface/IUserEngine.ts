import { RegisterUserParams } from "./params/user/RegisterUserParams";
import { RegisterUserResult } from "./result/user/RegisterUserResult";

export interface IUserEngine{
    register_user(params:RegisterUserParams): RegisterUserResult;

}

