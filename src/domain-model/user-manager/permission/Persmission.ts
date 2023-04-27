import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { PermissionGroup } from "./PermissionGroup"

@Entity()
export class Permission {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

   @Column({unique:true, nullable:false})
    permissionCode: string

    @Column({nullable:false})
    permissionDescription: string


    @ManyToOne(()=> PermissionGroup,(permissionGroup)=> permissionGroup.permissionGroupCode,{eager:true,nullable:false})
    permissionGroup:PermissionGroup




}
