import { Entity, Column, PrimaryColumn} from "typeorm"

@Entity({ schema: 'portal_consular_dev' })
export class MessageType{

    @PrimaryColumn()
    name:string // PRAISE, SUGGESTIONS,CLAIMS

    @Column()
    description:string
   
}