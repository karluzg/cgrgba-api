import { Entity, Column,  PrimaryColumn} from "typeorm"

@Entity({ schema: 'portal_consular_dev' })
export class NewsCategory {

    @PrimaryColumn()
    code:string
    
    @Column()
    description: string

    @Column()
    email: Date

    @Column()
     content: string

   @Column()
   status:boolean

}
