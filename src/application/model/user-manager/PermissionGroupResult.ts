import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/model/User';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Permission } from '../../../domain/model/Permission';
import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';
import { PermissionGroup } from '../../../domain/model/PermissionGroup';

export class PermissionGroupResult extends ResultTemplate {
  @ApiProperty({ description: 'Objeto de Permissão' })
  @IsObject()
  @ValidateNested()
  @Type(() => PermissionGroup)
  public permission: PermissionGroup;

  public get getPermission(): PermissionGroup {
    return this.permission;
  }

  public set setPermission(permission: PermissionGroup) {
    this.permission = permission;
  }
}
