import { Entity, Column,  PrimaryColumn} from "typeorm"

@Entity({schema:"portalConsular"})
export class NewsCategory {

    @PrimaryColumn()
    newsCategoryCode:string
    
    @Column()
    newsCategoryDescription: string

    @Column()
    email: Date

    @Column()
    messageContent: string

   @Column()
   feedbackStatus:boolean

}
