import { User } from "../../../domain-model/User";
import { Result } from "../../Result";

export class RegisterUserResult extends Result{

  private user:User

  public get getUser():User{
      return this.user;
   }
   set setUser(user:User){
      this.user=user;
   }

}

  

