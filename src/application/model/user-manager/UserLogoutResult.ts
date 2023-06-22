import { ApiProperty } from '@nestjs/swagger';
import { TokenSession } from '../../../domain/model/TokenSession';

import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';
import { Type } from 'class-transformer';
import { IsBoolean, IsObject, ValidateNested } from 'class-validator';
import { UserPossibleStatus } from '../../../domain/model/UserPossibleStatus';

export class UserLogoutResult extends ResultTemplate {
  @ApiProperty({ description: 'o Resultado de Logout' })
  @IsBoolean()
  private result: Boolean;

  public get getResult(): Boolean {
    return this.result;
  }

  public set setResult(value: Boolean) {
    this.result = value;
  }

  
}
