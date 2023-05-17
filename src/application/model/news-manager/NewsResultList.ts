import { ApiProperty } from "@nestjs/swagger";
import { News } from "../../../domain/model/News";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class NewsResultList extends ResultTemplate {
  @ApiProperty({ type: () => News, isArray: true })
  @IsArray()
  @ValidateNested()
  @Type(() => News)
  private  news: News[];

  public get getNews(): News[] {
    return this.news;
  }

  public set setNews(news: News[]) {
    this.news = news;
  }
}
