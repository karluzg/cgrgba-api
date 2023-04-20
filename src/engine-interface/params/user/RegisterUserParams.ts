import { Params } from "../../../engine-interface-impl/operation/Params"



export class RegisterUserParams extends Params{
   
    private userFullName:string
    private userMobileNumber: string
    private userEmail:string
 
  
    constructor(userFullName:string, userMobileNumber: string, userEmail:string){
      super()
      this.userFullName=userFullName
      this.userMobileNumber=userMobileNumber
      this.userEmail=userEmail
    }
  
    get getuserFullName(): string{
      return this.userFullName
    }
    get getUserMobileNumber(): string{
      return this.userMobileNumber
    }
    get getUserEmail(){
      return this.userEmail;
    }
  }
  