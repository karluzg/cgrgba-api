import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/model/User';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Permission } from '../../../domain/model/Permission';
import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';

export class PermissionResult extends ResultTemplate {
  @ApiProperty({ description: 'Objeto de Permissão' })
  @IsObject()
  @ValidateNested()
  @Type(() => Permission)
  public permission: Permission;

  constructor() {
    super();
    this.getSuccessfullyMessage();
  }

  public get getPermission(): Permission {
    return this.permission;
  }

  public set setPermission(permission: Permission) {
    this.permission = permission;
  }
}
