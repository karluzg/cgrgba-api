import { Entity, Column, PrimaryColumn} from "typeorm"

@Entity()
export class MessageType{

    @PrimaryColumn()
    messageType:string // PRAISE, SUGGESTIONS,CLAIMS

    @Column()
    descriptionMessage:string
   
}