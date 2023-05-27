import { IsString } from 'class-validator';
import { ParamsTemplate } from '../../../infrestructure/template/ParamsTemplate';
import { AuthParamsTemplate } from '../../../infrestructure/template/AuthParamsTemplate';

export class UpdatePasswordParams extends AuthParamsTemplate {
  @IsString({ message: 'A senha antiga deve ser uma string' })
  private oldPassword: string;

  @IsString({ message: 'A nova senha deve ser uma string' })
  private newPassword: string;

  @IsString({ message: 'A confirmação de senha deve ser uma string' })
  private confirmPassword: string;

  constructor(authenticationToken: string,oldPassword: string, newPassword: string, confirmPassword: string) {
    super(authenticationToken);
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }

  public get getOldPassword(): string {
    return this.oldPassword;
  }

  public set setOldPassword(oldPassword: string) {
    this.oldPassword = oldPassword;
  }

  public get getNewPassword(): string {
    return this.newPassword;
  }

  public set setNewPassword(newPassword: string) {
    this.newPassword = newPassword;
  }

  public get getConfirmPassword(): string {
    return this.confirmPassword;
  }

  public set setConfirmPassword(confirmPassword: string) {
    this.confirmPassword = confirmPassword;
  }
}
