import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "../user/User"
import { Role } from "./Role"

@Entity()
export class UserRole {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User,(user)=> user.userRoles)
    user:User

    
    @ManyToOne(()=> Role,(role)=> role.id)
    role:Role


}
