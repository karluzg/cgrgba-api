import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { News } from "../../../domain/model/News";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class NewsResult extends ResultTemplate {
    @ApiProperty({ description: 'The news object', type: () => News })
    @IsObject()
    @ValidateNested()
    @Type(() => News)
    private news: News;
  
    public get getNews(): News {
      return this.news;
    }
  
    public set setNews(news: News) {
      this.news = news;
    }
}
