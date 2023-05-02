import { Entity, Column, PrimaryColumn} from "typeorm"

@Entity({schema:"portalConsular"})
export class MessageType{

    @PrimaryColumn()
    messageType:string // PRAISE, SUGGESTIONS,CLAIMS

    @Column()
    descriptionMessage:string
   
}