import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { Service } from "./Service";
import { IsObject, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


@Entity({ schema: 'portal_consular_dev' })
export class SchedulingCategory {

    @PrimaryColumn()
    @IsString()
    code: string

    @Column({nullable:false})
    @IsString()
    description: string

    @OneToMany(() => Service, service => service.category)
    services: Service[];

}
