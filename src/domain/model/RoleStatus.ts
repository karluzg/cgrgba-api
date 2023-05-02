import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity({schema:"portalConsular"})
export class RoleStatus {

    @PrimaryColumn()
    roleStatusCode: string

    @Column()
    roleStatusDescription: string
}
