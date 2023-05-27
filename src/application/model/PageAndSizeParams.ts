import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
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
  queryParam?: string;

  @ApiProperty({ description: 'Column to order the results by' })
  @IsOptional()
  @IsString()
  orderColumn?: string;

  @ApiProperty({ description: 'Order direction: ASC or DESC' })
  @IsOptional()
  @IsString()
  direction?: 'ASC' | 'DESC';

  constructor(
    authenticationToken: string,
    page: number,
    size: number,
    queryParam?: string,
    orderColumn?: string,
    direction?: 'ASC' | 'DESC'
  ) {
    super(authenticationToken);
    this.page = page;
    this.size = size;
    this.queryParam = queryParam;
    this.orderColumn = orderColumn;
    this.direction = direction;
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

  public get getOrderColumn(): string | undefined {
    return this.orderColumn;
  }

  public get getDirection(): 'ASC' | 'DESC' | undefined {
    return this.direction;
  }
}