import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { SchedulingTimeConfiguration } from "./SchedulingTimeConfiguration";
import { IsNumber, IsString } from "class-validator";
import * as jsdoc from 'swagger-jsdoc';

@Entity({schema:"portal_consular_dev"})
export class Hour {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  value: string;

  @ManyToOne(() => SchedulingTimeConfiguration, schedulingTimeConfiguration => schedulingTimeConfiguration.hours)
  schedulingTimeConfiguration: SchedulingTimeConfiguration;
}