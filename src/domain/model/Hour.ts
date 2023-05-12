import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { SchedulingTimeConfiguration } from "./SchedulingTimeConfiguration";

@Entity()
export class Hour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => SchedulingTimeConfiguration, schedulingTimeConfiguration => schedulingTimeConfiguration.hours)
  schedulingTimeConfiguration: SchedulingTimeConfiguration;
}