import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Citizen } from "./Citizen"
import { SchedulingService } from "./SchedulingService"
import { SchedulingTime } from "./SchedulingTime"
import { SchedulingStatus } from "./SchedulingStatus"

@Entity({schema:"portalConsular"})
export class Scheduling {

    @PrimaryGeneratedColumn({ type:"bigint"})
    id: number

    @ManyToOne(()=> User,(user)=> user.id,{eager:true})
    user:User

    @ManyToOne(()=> Citizen,(citzen)=> citzen.id,{eager:true})
    citzen:Citizen

    @ManyToOne(()=> SchedulingService,(schedulingService) => schedulingService.schedulingServiceCode,{eager:true})
    schedulingService:SchedulingService

    @ManyToOne(() => SchedulingTime, (schedulingTimeHour) => schedulingTimeHour.id, { eager: true })
    schedulingTimeHour: SchedulingTime

   
    @ManyToOne(()=> SchedulingStatus,(schedulingStatus) => schedulingStatus.schedulingStatusCode,{eager:true})
    schedulingStatus:SchedulingStatus

}
