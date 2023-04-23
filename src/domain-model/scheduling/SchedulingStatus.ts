import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity()
export class SchedulingStatus {

    @PrimaryColumn()
    schedulingStatusCode: string

    @Column({nullable:false})
    schedulingStatusDescription:string


}
