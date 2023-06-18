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

  @IsArray()
  private roles?: string[]

  constructor(authenticationToken: string, userFullName: string, userMobileNumber: string, userEmail: string, roles?:string []) {
    super(authenticationToken);
    this.fullName = userFullName;
    this.mobileNumber = userMobileNumber;
    this.email = userEmail;
    this.roles=roles;
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

  public get getRoles(): string[] {
    return this.roles;
  }
}
