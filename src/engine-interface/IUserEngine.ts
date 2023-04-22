import { RegisterUserParams } from "./params/user/RegisterUserParams";
import { RegisterUserResult } from "./result/RegisterUserResult";

export interface IUserEngine{
    create_user(params:RegisterUserParams): RegisterUserResult;

}

