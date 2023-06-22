import { IsString } from 'class-validator';
import { ParamsTemplate } from '../../../infrestructure/template/ParamsTemplate';

export class UserLogoutParams extends ParamsTemplate {
  @IsString({ message: 'O Token deve ser uma string' })
  private token: string;



  constructor(token: string) {
    super();
    this.token = token;
  }

  public get getToken(): string {
    return this.token;
  }


}
