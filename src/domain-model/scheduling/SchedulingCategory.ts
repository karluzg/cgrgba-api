import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity()
export class SchedulingCategory {

    @PrimaryColumn()
    categoryCode: string

    @Column({nullable:false})
    categoryDescription:string


}
