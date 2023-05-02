import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany} from "typeorm"
import { User } from "./User"
import { Permission } from "./Persmission"

@Entity({schema:"portalConsular"})
export class Role {

    @PrimaryGeneratedColumn({type:"bigint"})
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
