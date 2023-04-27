import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { InitialActionType } from "./InitialActionType"
import { User } from "./User"

@Entity()
export class InitialAction {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column()
    executedDate: Date

    @Column({type:'enum', enum:InitialActionType})
    initialActionType: InitialActionType

    @ManyToOne(()=> User,(user)=> user.id,{eager:true})
    user:User

}
