import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParamsTemplate } from '../../../infrestructure/template/ParamsTemplate';
import { AuthParamsTemplate } from '../../../infrestructure/template/AuthParamsTemplate';

export class NewsCategoryParams extends AuthParamsTemplate {
  @ApiProperty({ description: 'Código da categoria de noticias' })
  @IsString()
  public code: string;

  @ApiProperty({ description: 'Descrição da categorias de noticias' })
  @IsString()
  public description: string;

  constructor(authenticationToken: string, code: string,description: string) {
    super(authenticationToken);
    this.code = code;
    this.description = description;
  }

  
  public get getCode(): string {
    return this.code;
  }


  
  public get getDescription(): string {
    return this.description;
  }
}
