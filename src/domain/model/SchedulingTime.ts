import { Entity, PrimaryColumn } from "typeorm"


@Entity({schema:"portalConsular"})
export class SchedulingTime {

    @PrimaryColumn()
    schedulingDate: Date

    

}
