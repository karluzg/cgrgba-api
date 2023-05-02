import { Entity, Column, PrimaryColumn} from "typeorm"

@Entity({schema:"portalConsular"})
export class PermissionGroup{


    @PrimaryColumn()
    permissionGroupCode: string

    @Column()
    permissionGroupDescription: string
}