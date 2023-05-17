import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { NewsCategory } from "./NewsCategory";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

@Entity({ schema: "portalConsular" })
export class News {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ unique: true, nullable: false })
  @IsString()
  title: string;

  @Column({ type: "text",nullable: false  })
  @IsString()
  content: string;

  @Column({nullable: false  })
  @IsString()
  message: string;

  @Column({nullable: true  })
  @IsString()
  imagePath: string;
 
  imageFileContent: string;

  @IsDate()
  @Column({ nullable: false, type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  creationDate: Date

  @IsDate()
  @Column({ nullable: false, type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  date: Date

  @Column()
  @IsBoolean()
  status: boolean;
  
  @ManyToOne(() => NewsCategory, { eager: true, nullable: false })
  newsCategory: NewsCategory;
}