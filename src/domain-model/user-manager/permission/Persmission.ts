import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { PermissionGroup } from "./PermissionGroup"

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number

   @Column({unique:true})
    permissionCode: string

    @Column({nullable:false})
    permissionDescription: string

    @Column({nullable:true})
    roleDescription: string

    @ManyToOne(()=> PermissionGroup,(permissionGroup)=> permissionGroup.permissionGroupCode,{eager:true})
    permissionGroup:PermissionGroup




}
