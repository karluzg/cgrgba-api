import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm"


@Entity({ schema: 'portal_consular_dev' })
export class SchedulingStatus {

    @PrimaryColumn()
    code: string

    @Column({nullable:false})
    description: string

    @ManyToMany(() => SchedulingStatus)
    nextStatus: SchedulingStatus[];

    constructor(code: string) {
        this.code = code;
    }

    getCode(): string {
        return this.code;
    }

}
