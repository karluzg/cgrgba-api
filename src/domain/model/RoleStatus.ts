import { Entity, PrimaryColumn, Column } from "typeorm"
import { RoleStatusEnum } from "./enum/RolestatusEnum"


@Entity({ schema: 'portal_consular_dev' })
export class RoleStatus {

    @PrimaryColumn()
    code: string

    @Column()
    description: string

    @Column()
    listed: boolean // se for um role reomvido, o estado fica a 0 e não será listado



}





