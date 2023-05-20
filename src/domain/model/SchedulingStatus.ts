import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity({ schema: 'portal_consular_dev' })
export class SchedulingStatus {

    @PrimaryColumn()
    code: string

    @Column({nullable:false})
    description: string


}
