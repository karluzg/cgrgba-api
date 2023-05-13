import { Entity, Column, PrimaryColumn} from "typeorm"

@Entity({schema:"portalConsular"})
export class MessageType{

    @PrimaryColumn()
    name:string // PRAISE, SUGGESTIONS,CLAIMS

    @Column()
    description:string
   
}