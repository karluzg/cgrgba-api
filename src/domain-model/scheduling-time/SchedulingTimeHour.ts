import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany} from "typeorm"
import { SchedulingTime } from "./SchedulingTime"
import { Hour } from "./Hour"

@Entity()
export class SchedulingTimeHour {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    available: boolean // if numCollaborator is equal number of the booking then available =false


    @Column()
    numCollaboratorAvailable: number 

   
    @ManyToOne(()=> SchedulingTime,(schedulingTime)=> schedulingTime.date,{eager:true})
    schedulingTime:SchedulingTime

    @ManyToOne(()=> Hour,(hour)=> hour.hourCode,{eager:true})
    hour:Hour


}
