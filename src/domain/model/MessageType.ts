import { Entity, Column, PrimaryColumn} from "typeorm"

@Entity({ schema: 'portal_consular_dev' })
export class FeedbackMessageType {

    @PrimaryColumn()
    code: string // PRAISE, SUGGESTIONS,CLAIMS, OTHER

    @Column()
    description:string
   
}