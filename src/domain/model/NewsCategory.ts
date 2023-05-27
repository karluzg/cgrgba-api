import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IsBoolean, IsDate, IsString } from "class-validator";
import { News } from "./News";

@Entity({ schema: 'portal_consular_dev' })
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
