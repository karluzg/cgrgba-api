import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../../../domain/model/User';
import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';


export class UserResult extends ResultTemplate {
  @ApiProperty({ description: 'The user object', type: () => User })
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  private user: User;

  public get getUser(): User {
    return this.user;
  }

  public set setUser(user: User) {
    this.user = user;
  }
}

