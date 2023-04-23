import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity()
export class SchedulingService {

    @PrimaryColumn()
    schedulingServiceCode: string

    @Column({nullable:false})
    schedulingServiceDescription:string


}
