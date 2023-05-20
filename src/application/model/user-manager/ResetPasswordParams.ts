import { IsString, IsNotEmpty } from 'class-validator';
import { ParamsTemplate } from '../../../infrestructure/template/ParamsTemplate';
import { AuthParamsTemplate } from '../../../infrestructure/template/AuthParamsTemplate';

export class ResetPasswordParams extends ParamsTemplate {
  @IsNotEmpty({ message: 'Email nao pode estar vazio' })
  @IsString({ message: 'Email é string' })
  private email: string;

  @IsNotEmpty({ message: 'Mobile number nao pode estar vazio' })
  @IsString({ message: 'Mobile é string' })
  private mobileNumber: string;

  constructor(mobileNumber: string, email: string ) {
    super();
    this.email = email;
    this.mobileNumber = mobileNumber;
  }

  public get getEmail(): string {
    return this.email;
  }

  public set setEmail(email: string) {
    this.email = email;
  }

  public get getMobileNumber(): string {
    return this.mobileNumber;
  }

  public set setMobileNumber(mobileNumber: string) {
    this.mobileNumber = mobileNumber;
  }
}
