import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class RoleStatus {

    @PrimaryColumn()
    roleStatusCode: string

    @Column()
    roleStatusDescription: string
}
