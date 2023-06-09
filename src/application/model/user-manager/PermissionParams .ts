import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParamsTemplate } from '../../../infrestructure/template/ParamsTemplate';
import { AuthParamsTemplate } from '../../../infrestructure/template/AuthParamsTemplate';

export class PermissionParams extends AuthParamsTemplate {
  @ApiProperty({ description: 'Código da permissão' })
  @IsString()
  public code: string;

  @ApiProperty({ description: 'Nome do grupo de permissões' })
  @IsString()
  public group: string;

  @ApiProperty({ description: 'Descrição da permissão' })
  @IsString()
  public description: string;

  constructor(authenticationToken: string, code: string, description: string, group: string) {
    super(authenticationToken);
    this.code = code;
    this.group = group;
    this.description = description;
  }

  public get getCode(): string {
    return this.code;
  }

  
  public get getGroup(): string {
    return this.group;
  }

  public get getDescription(): string {
    return this.description;
  }
}
