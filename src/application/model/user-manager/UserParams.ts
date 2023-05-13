
import { IsString } from "class-validator"
import { AuthParamsTemplate } from "../../../infrestructure/template/AuthParamsTemplate"


export class UserParams extends AuthParamsTemplate {
  @IsString()
  private fullName: string
  @IsString()
  private mobileNumber: string
  @IsString()
  private email: string

  constructor(authenticationToken: string, userFullName: string, userMobileNumber: string, userEmail: string) {
    super(authenticationToken)
    this.fullName = userFullName
    this.mobileNumber = userMobileNumber
    this.email = userEmail
  }

  get getFullName(): string {
    return this.fullName
  }
  get getMobileNumber(): string {
    return this.mobileNumber
  }
  get getEmail() {
    return this.email;
  }
}





