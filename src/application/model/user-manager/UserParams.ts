import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { AuthParamsTemplate } from '../../../infrestructure/template/AuthParamsTemplate';

export class UserParams extends AuthParamsTemplate {
  @ApiProperty({ description: 'O nome completo do utilizador' })
  @IsString()
  private fullName: string;

  @ApiProperty({ description: 'O número de celular do utilizador' })
  @IsString()
  private mobileNumber: string;

  @ApiProperty({ description: 'O email do utilizador' })
  @IsString()
  private email: string;

  @IsString()
  private roleName: string

  constructor(authenticationToken: string, userFullName: string, userMobileNumber: string, userEmail: string, roleName: string) {
    super(authenticationToken);
    this.fullName = userFullName;
    this.mobileNumber = userMobileNumber;
    this.email = userEmail;
    this.roleName = roleName;
  }

  public get getFullName(): string {
    return this.fullName;
  }

  public get getMobileNumber(): string {
    return this.mobileNumber;
  }

  public get getEmail(): string {
    return this.email;
  }

  public get getRoleName(): string {
    return this.roleName;
  }
}
