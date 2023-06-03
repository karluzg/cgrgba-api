import { IActivable } from "./IActivable";


export interface IUserActivable extends IActivable {


    suspend (): void;
  
    remove (): void;

}