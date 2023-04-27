import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "../user-manager/user/User"
import { Citizen } from "../citizen/Citizen"
import { SchedulingService } from "./SchedulingService"
import { SchedulingTimeHour } from "../scheduling-time/SchedulingTimeHour"
import { SchedulingStatus } from "./SchedulingStatus"

@Entity()
export class Scheduling {

    @PrimaryGeneratedColumn({ type:"bigint"})
    id: number

    @ManyToOne(()=> User,(user)=> user.userRoles)
    user:User

    @ManyToOne(()=> SchedulingService,(schedulingService) => schedulingService.schedulingServiceCode)
    schedulingService:SchedulingService

    @ManyToOne(()=> SchedulingTimeHour,(schedulingTimeHour) => schedulingTimeHour.id)
    schedulingTimeHour:SchedulingTimeHour

   
    @ManyToOne(()=> SchedulingStatus,(schedulingStatus) => schedulingStatus.schedulingStatusCode)
    schedulingStatus:SchedulingStatus

}
