import { User } from "../../../domain-model/user-manager/user/User";
import { Result } from "../../Result";

export class RegisterUserResult extends Result{

  private user:User

   get getUser():User{
      return this.user;
   }
   set setUser(user:User){
      this.user=user;
   }

}

  

