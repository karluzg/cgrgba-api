import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./User"


@Entity({schema:"portalConsular"})
export class TokenSession {

    @PrimaryColumn("uuid")
    token: string

    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date

    @Column()
    expireDate: Date

   
    @ManyToOne(()=> User,(user)=> user.id,{eager:true, nullable:false})
    user:User


}
