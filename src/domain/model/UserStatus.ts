import { PrimaryColumn, Column, Entity, ManyToOne } from "typeorm"

@Entity({ schema: 'portal_consular_dev' })
export class UserStatus {

    @PrimaryColumn()
    code: string

    @Column()
    description: string

    @Column()
    listed: boolean // se for um user reomvido, o estado fica a 0 e não será listado

    constructor(code: string) {
        this.code = code;
    }

    getCode(): string {
        return this.code;
    }
}



