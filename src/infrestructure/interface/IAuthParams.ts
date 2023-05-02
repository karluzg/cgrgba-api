import { IParams as Params } from "./IParams";

export interface IAuthParams extends Params{

    getAuthenticationToken():string

   
}