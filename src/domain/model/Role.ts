import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany} from "typeorm"
import { User } from "./User"
import { Permission } from "./Permission"
import { RoleStatus } from "./RoleStatus"

@Entity({schema:"portalConsular"})
export class Role {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column()
    roleName: string

    @Column()
    roleDescription: string

    @ManyToMany(() => Permission, { lazy: true })
    @JoinTable()
    permissions: Permission[]

    @ManyToOne(() => User, (lastUpdateBy) => lastUpdateBy.id, { eager: true })
    lastUpdateBy: User

    @ManyToOne(()=> User,(createdBy)=> createdBy.id,{eager:true})
    createdBy:User


    @ManyToOne(() => RoleStatus, (roleStatus) => roleStatus.code)
    roleStatus: RoleStatus

    @Column()
    isAdmin:boolean




}
