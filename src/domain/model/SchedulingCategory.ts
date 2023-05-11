import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity({schema:"portalConsular"})
export class SchedulingCategory {

    @PrimaryColumn()
    code: string

    @Column({nullable:false})
    description: string

    @Column('text', { array: true })
    services: string[]


}
