import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { InitialActionTypeEnum } from "./enum/InitialActionType"
import { User } from "./User"

@Entity({schema:"portalConsular"})
export class InitialAction {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column()
    executedDate: Date

    @Column({type:'enum', enum:InitialActionTypeEnum})
    initialActionType: InitialActionTypeEnum

    @ManyToOne(()=> User,(user)=> user.id,{eager:true})
    user:User

}
