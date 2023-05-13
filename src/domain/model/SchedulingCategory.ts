import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { Service } from "./Service";


@Entity({schema:"portalConsular"})
export class SchedulingCategory {

    @PrimaryColumn()
    code: string

    @Column({nullable:false})
    description: string

    @OneToMany(() => Service, service => service.schedulingCategory)
    services: Service[];

}
