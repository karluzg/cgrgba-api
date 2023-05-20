
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { TokenSession } from "./TokenSession"

@Entity({ schema: 'portal_consular_dev' })
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
