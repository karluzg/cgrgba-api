import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { AuthParamsTemplate } from '../../infrestructure/template/AuthParamsTemplate';
export class PageAndSizeParams extends AuthParamsTemplate {
  @ApiProperty({ description: 'The page number' })
  @IsNumber()
  page: number;

  @ApiProperty({ description: 'The page size' })
  @IsNumber()
  size: number;

  
  @ApiProperty({ description: 'Parametro extra para query, depende do tipo de pedido' })
  @IsString()
  queryParam: string;

  constructor(authenticationToken: string, page: number, size: number, queryParam:string) {
    super(authenticationToken);
    this.page = page;
    this.size = size;
    this.queryParam= queryParam;
  }

  public get getPage(): number {
    return this.page;
  }

  public get getSize(): number {
    return this.size;
  }

  public get getQueryParam(): string {
    return this.queryParam;
  }
}