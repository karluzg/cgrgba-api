import { ApiProperty } from '@nestjs/swagger';
import { TokenSession } from '../../../domain/model/TokenSession';

import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { UserPossibleStatus } from '../../../domain/model/UserPossibleStatus';

export class UserLoginResult extends ResultTemplate {
  @ApiProperty({ description: 'O token de sessão do utilizador' })
  @IsObject()
  @ValidateNested()
  @Type(() => TokenSession)
  private session: TokenSession;

  private nextPossibleStatus:UserPossibleStatus[]

  public get getToken(): TokenSession {
    return this.session;
  }

  public set setToken(value: TokenSession) {
    this.session = value;
  }

  get getPossibleStatus(): UserPossibleStatus[]{
    return this.nextPossibleStatus
  }

 set setnextPossibleStatus(nextPossibleStatus:UserPossibleStatus[]){
     this.nextPossibleStatus=nextPossibleStatus
  }
}
