import { IParams as Params } from "./IParams";

export interface AuthParams extends Params{

    getAuthenticationToken():string

   
}