import { Entity, Column, PrimaryColumn, OneToMany} from "typeorm"
import { Permission } from "./Permission";

@Entity({schema:"portalConsular"})
export class PermissionGroup{


    @PrimaryColumn()
    code: string

    @Column()
    description: string

    @OneToMany(() => Permission, permission => permission.permissionGroup, { cascade: true })
    permissions: Permission[];

}