import { ApiProperty } from '@nestjs/swagger';
import { TokenSession } from '../../../domain/model/TokenSession';
import { User } from '../../../domain/model/User';
import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

export class UserLoginResult extends ResultTemplate {
  @ApiProperty({ description: 'O token de sessão do utilizador' })
  @IsObject()
  @ValidateNested()
  @Type(() => TokenSession)
  private session: TokenSession;

  public get getToken(): TokenSession {
    return this.session;
  }

  public set setToken(value: TokenSession) {
    this.session = value;
  }
}
