import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/model/User';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Permission } from '../../../domain/model/Permission';
import { ResultTemplate } from '../../../infrestructure/template/ResultTemplate';
import { PermissionGroup } from '../../../domain/model/PermissionGroup';
import { NewsCategory } from '../../../domain/model/NewsCategory';

export class NewsCategoryResult extends ResultTemplate {
  @ApiProperty({ description: 'Categorias das noticias' })
  @IsObject()
  @ValidateNested()
  @Type(() => NewsCategory)
  public category: NewsCategory;

  public get getCategory(): NewsCategory {
    return this.category;
  }

  public set setCategory(category: NewsCategory) {
    this.category = category;
  }
}
