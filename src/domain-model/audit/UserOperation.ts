
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { TokenSession } from "../session/TokenSession"

@Entity()
export class UserOperation {

    @PrimaryGeneratedColumn({type:"bigint"})
    id : number
    
    @Column()
    description:string
    
    @Column()
    beginDate : Date

    @Column()
    endDate : Date

    @Column()
    operationName : string

    @ManyToOne(()=> TokenSession,(token)=> token.token ,{eager:true, nullable:false})
    token:TokenSession
}
