import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany} from "typeorm"
import { User } from "./User"
import { Permission } from "./Permission"
import { RoleStatus } from "./RoleStatus"

@Entity({schema:"portalConsular"})
export class Role {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany(() => Permission, { lazy: true })
    @JoinTable()
    permissions: Permission[]

    @ManyToOne(() => User, { eager: true })
    lastUpdateBy: User

    @ManyToOne(()=> User,{eager:true})
    createdBy:User


    @ManyToOne(() => RoleStatus)
    roleStatus: RoleStatus

    @Column()
    isAdmin: boolean

    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date




}
