import { Entity, PrimaryColumn } from "typeorm"


@Entity()
export class SchedulingTime {

    @PrimaryColumn()
    schedulingDate: Date

    

}
