import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity({schema:"portalConsular"})
export class SchedulingService {

    @PrimaryColumn()
    schedulingServiceCode: string

    @Column({nullable:false})
    schedulingServiceDescription:string


}
