import { Entity, Column, PrimaryColumn} from "typeorm"

@Entity({schema:"portalConsular"})
export class PermissionGroup{


    @PrimaryColumn()
    code: string

    @Column()
    description: string
}