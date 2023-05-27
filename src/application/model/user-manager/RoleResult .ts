import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { Role } from '../../../domain/model/Role';
import { ApiProperty } from '@nestjs/swagger';
import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';

export class RoleResult extends ResultTemplate {
  @ApiProperty({ description: 'Objeto de Role' })
  @IsObject()
  @ValidateNested()
  @Type(() => Role)
  private role: Role;

  public get getRole(): Role {
    return this.role;
  }

  public set setRole(role: Role) {
    this.role = role;
  }
}
