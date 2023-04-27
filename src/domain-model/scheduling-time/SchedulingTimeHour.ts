import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, OneToMany, PrimaryColumn} from "typeorm"
import { SchedulingTime } from "./SchedulingTime"
import { Hour } from "./Hour"

@Entity()
export class SchedulingTimeHour {

 
    @PrimaryColumn({nullable:false})
    @ManyToOne(()=> SchedulingTime,(schedulingTime)=> schedulingTime.schedulingDate,{eager:true,nullable:false})
    schedulingTime:SchedulingTime

  

    @OneToMany(()=> Hour,(hour)=> hour.hourCode,{eager:true,nullable:false})
    hour:Hour[]

    
    @Column({nullable:false})
    numCollaboratorAvailable: number 

    @Column()
    availableHour: boolean // if numCollaborator is equal number of the booking, then availableHour=false for that date



}
