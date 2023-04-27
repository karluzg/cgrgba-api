import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { NewsCategory } from "./NewsCategory"



@Entity()
export class News {

    @PrimaryGeneratedColumn({type:"bigint"})
    id:number
    
    @Column({unique:true, nullable:false})
    títle: string

    
    @Column({type:"text"})
    newsContent: string // save tge big varchar in postgress

    @Column()
    messageContent: string

   
   @Column()
   imagePath:boolean

   @ManyToOne(()=> NewsCategory,(newsCategory)=> newsCategory.newsCategoryCode,{eager:true, nullable:false})
   newsCategory:NewsCategory
}
