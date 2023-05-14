import { IsString } from 'class-validator';
import { ParamsTemplate } from '../../../infrestructure/template/ParamsTemplate';

export class UpdatePasswordParams extends ParamsTemplate {
  @IsString({ message: 'A senha antiga deve ser uma string' })
  private oldPassword: string;

  @IsString({ message: 'A nova senha deve ser uma string' })
  private newPassword: string;

  @IsString({ message: 'A confirmação de senha deve ser uma string' })
  private confirmPassword: string;

  constructor(oldPassword: string, newPassword: string, confirmPassword: string) {
    super();
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
