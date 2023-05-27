import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm"
import { SchedulingCategory } from "./SchedulingCategory";
import { IsObject,IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@Entity({ schema: 'portal_consular_dev' })
export class Service {

  @PrimaryColumn()
  @IsString()
  code: string;

  @Column({ nullable: false })
  @IsString()
  name: string;


  @ManyToOne(() => SchedulingCategory, schedulingCategory => schedulingCategory.services)
  category: SchedulingCategory;

}