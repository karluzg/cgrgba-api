import { IsNotEmpty, IsString } from 'class-validator';
import { Entity,  Column, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'portal_consular_dev' })
export class TemplateUsageType{
   
    @PrimaryColumn()
    @IsString()
    @IsNotEmpty()
    code: string;

    @Column()
    @IsString()
    description: string;
    
}