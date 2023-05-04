import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany} from "typeorm"
import { User } from "./User"
import { Permission } from "./Permission"

@Entity({schema:"portalConsular"})
export class Role {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column()
    roleName: string

    @Column()
    roleDescription: string

    @ManyToMany(() => Permission, { lazy: true })
    @JoinTable({ name: "role_permission" })
    permissions: Permission[]


    @ManyToOne(()=> User,(createdBy)=> createdBy.id,{eager:true})
    createdBy:User

    @ManyToOne(()=> User,(lastUpdateBy)=> lastUpdateBy.id,{eager:true})
    lastUpdateBy:User

    @Column()
    isAdmin:boolean




}
