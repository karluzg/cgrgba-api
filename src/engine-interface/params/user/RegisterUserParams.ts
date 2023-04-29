
import { AuthParamsTemplate } from "../../AuthParamsTemplate"



export class RegisterUserParams extends AuthParamsTemplate{
   
    private userFullName:string
    private userMobileNumber: string
    private userEmail:string
 
  
    constructor(authenticationToken:string, userFullName:string, userMobileNumber: string, userEmail:string){
      super(authenticationToken)
      this.userFullName=userFullName
      this.userMobileNumber=userMobileNumber
      this.userEmail=userEmail
    }
  
    get getUserFullName(): string{
      return this.userFullName
    }
    get getUserMobileNumber(): string{
      return this.userMobileNumber
    }
    get getUserEmail(){
      return this.userEmail;
    }
  }
  