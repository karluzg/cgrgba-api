import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { NewsCategory } from "./NewsCategory"



@Entity({ schema: 'portal_consular_dev' })
export class News {

    @PrimaryGeneratedColumn({type:"bigint"})
    id:number
    
    @Column({unique:true, nullable:false})
    títle: string

    
    @Column({type:"text"})
    content: string // save tge big varchar in postgress

    @Column()
    message: string

   
   @Column()
   imagePath:boolean

   @ManyToOne(()=> NewsCategory,{eager:true, nullable:false})
   newsCategory:NewsCategory
}
