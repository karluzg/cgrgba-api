import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm"
import { PermissionGroup } from "./PermissionGroup"

@Entity({schema:"portalConsular"})
export class Permission {

    @PrimaryColumn({ type: "bigint" })
    id: number

    @Column({unique:true, nullable:false})
    code: string

    @Column({nullable:false})
    description: string


    @ManyToOne(() => PermissionGroup, permissionGroup => permissionGroup.permissions, { nullable: false })
    permissionGroup:PermissionGroup

}
