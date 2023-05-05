import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./User"


@Entity({schema:"portalConsular"})
export class TokenSession {

    @PrimaryColumn("uuid")
    token: string

    @Column()
    sessionCreationDate: Date

    @Column()
    sessionExpireDate: Date

   
    @ManyToOne(()=> User,(user)=> user.id,{eager:true, nullable:false})
    user:User


}
