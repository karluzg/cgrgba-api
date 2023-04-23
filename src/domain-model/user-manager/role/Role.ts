import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany} from "typeorm"
import { User } from "../user/User"
import { Permission } from "../permission/Persmission"

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    roleName: string

    @Column()
    roleDescription: string

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[]


    @ManyToOne(()=> User,(createdBy)=> createdBy.id,{eager:true})
    createdBy:User

    @ManyToOne(()=> User,(lastUpdateBy)=> lastUpdateBy.id,{eager:true})
    lastUpdateBy:User

    @Column()
    isAdmin:boolean




}
