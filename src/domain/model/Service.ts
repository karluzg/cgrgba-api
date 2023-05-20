import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SchedulingCategory } from "./SchedulingCategory";

@Entity({ schema: 'portal_consular_dev' })
export class Service {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => SchedulingCategory, schedulingCategory => schedulingCategory.services)
  schedulingCategory: SchedulingCategory;

}