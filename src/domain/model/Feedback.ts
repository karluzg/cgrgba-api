import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { MessageType } from "./MessageType"


@Entity({ schema: 'portal_consular_dev' })
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
   status:boolean

   @ManyToOne(()=> MessageType,{eager:true, nullable:false})
   messageType:MessageType
}
