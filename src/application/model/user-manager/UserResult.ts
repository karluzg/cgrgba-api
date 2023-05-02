import { User } from "../../../domain/model/User";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class UserResult extends ResultTemplate{

  private user:User

  public get getUser():User{
      return this.user;
   }
   set setUser(user:User){
      this.user=user;
   }

}

  

