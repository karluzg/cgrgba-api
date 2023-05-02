import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity({schema:"portalConsular"})
export class SchedulingCategory {

    @PrimaryColumn()
    categoryCode: string

    @Column({nullable:false})
    categoryDescription:string


}
