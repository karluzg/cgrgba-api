import { User } from "../../domain-model/User";
import { Result } from "../../common/response/Result";

export class RegisterUserResult extends Result{

  private user:User

   get getUser():User{
      return this.user;
   }
   set setUser(user:User){
      this.user=user;
   }

}

  

