import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { MessageType } from "./MessageType"


@Entity()
export class Feedback {

 
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number
    
    @Column()
    name: string

    @Column()
    email: Date

    @Column()
    messageContent: string

   
   @Column()
   feedbackStatus:boolean

   @ManyToOne(()=> MessageType,(messageType)=> messageType.messageType,{eager:true, nullable:false})
   messageType:MessageType
}
