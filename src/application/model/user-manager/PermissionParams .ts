import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParamsTemplate } from '../../../infrestructure/template/ParamsTemplate';

export class PermissionParams extends ParamsTemplate {
  @ApiProperty({ description: 'Código da permissão' })
  @IsString()
  public code: string;

  @ApiProperty({ description: 'Nome da permissão' })
  @IsString()
  public name: string;

  @ApiProperty({ description: 'Descrição da permissão' })
  @IsString()
  public description: string;

  constructor(code: string, name: string, description: string) {
    super();
    this.code = code;
    this.name = name;
    this.description = description;
  }
}
