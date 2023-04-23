import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { User } from "../user-manager/user/User"


@Entity()
export class Token {

    @PrimaryGeneratedColumn("uuid")
    token: string

    @Column()
    sessionCreationDate: Date

    @Column()
    sessionExpireDate: string

   
    @ManyToOne(()=> User,(user)=> user.id,{eager:true, nullable:false})
    user:User
}
