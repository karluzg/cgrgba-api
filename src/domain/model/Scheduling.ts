import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { User } from "./User"
import { Citizen } from "./Citizen"
import { SchedulingService } from "./SchedulingService"
import { SchedulingTime } from "./SchedulingTime"
import { SchedulingStatus } from "./SchedulingStatus"

@Entity({schema:"portalConsular"})
export class Scheduling {

    @PrimaryGeneratedColumn({ type:"bigint"})
    id: number

    @Column({ nullable: false, type: 'timestamp' })
    creationDate: Date

    @ManyToOne(() => User, (user) => user.id, { eager: true, nullable: false })
    user:User

    @ManyToOne(() => Citizen, (citzen) => citzen.id, { eager: true, nullable: false })
    citzen:Citizen

    @ManyToOne(() => SchedulingService, (schedulingService) => schedulingService.schedulingServiceCode, { eager: true, nullable: false })
    schedulingService:SchedulingService

    @ManyToOne(() => SchedulingTime, (schedulingTimeHour) => schedulingTimeHour.id, { eager: true, nullable: false })
    schedulingTimeHour: SchedulingTime

   
    @ManyToOne(() => SchedulingStatus, (schedulingStatus) => schedulingStatus.schedulingStatusCode, { eager: true, nullable: false })
    schedulingStatus:SchedulingStatus

}
