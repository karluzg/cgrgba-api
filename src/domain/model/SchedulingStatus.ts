import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity({schema:"portalConsular"})
export class SchedulingStatus {

    @PrimaryColumn()
    code: string

    @Column({nullable:false})
    description: string


}
