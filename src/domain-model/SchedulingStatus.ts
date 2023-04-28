import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity({schema:"portalConsular"})
export class SchedulingStatus {

    @PrimaryColumn()
    schedulingStatusCode: string

    @Column({nullable:false})
    schedulingStatusDescription:string


}
