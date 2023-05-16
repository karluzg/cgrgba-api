import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IsBoolean, IsDate, IsString } from "class-validator";
import { News } from "./News";

@Entity({ schema: "portalConsular" })
export class NewsCategory {
  @PrimaryColumn()
  @IsString()
  code: string;

  @Column()
  @IsString()
  description: string;

  @OneToMany(() => News, (news) => news.newsCategory, { cascade: true })
  news: News[];

}
