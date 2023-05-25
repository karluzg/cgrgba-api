import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm"
import { SchedulingCategory } from "./SchedulingCategory";

@Entity({ schema: 'portal_consular_dev' })
export class Service {

  @PrimaryColumn()
  code: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => SchedulingCategory, schedulingCategory => schedulingCategory.services)
  category: SchedulingCategory;

}