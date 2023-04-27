import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { User } from "../user-manager/user/User"


@Entity()
export class TokenSession {

    @PrimaryGeneratedColumn("uuid")
    token: string

    @Column()
    sessionCreationDate: Date

    @Column()
    sessionExpireDate: Date

   
    @ManyToOne(()=> User,(user)=> user.id,{eager:true, nullable:false})
    user:User


}
