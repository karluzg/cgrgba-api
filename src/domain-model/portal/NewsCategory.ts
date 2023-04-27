import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn} from "typeorm"

@Entity()
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
