import { IsString } from 'class-validator';
import { ParamsTemplate } from '../../../infrestructure/template/ParamsTemplate';

export class UserLoginParams extends ParamsTemplate {
  @IsString({ message: 'A password deve ser uma string' })
  private password: string;

  @IsString({ message: 'O email deve ser uma string' })
  private email: string;

  constructor(email: string, password: string) {
    super();
    this.password = password;
    this.email = email;
  }

  public get getPassword(): string {
    return this.password;
  }

  public get getEmail(): string {
    return this.email;
  }
}
