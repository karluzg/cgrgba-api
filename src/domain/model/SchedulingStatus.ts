import { IsString } from "class-validator";
import { Entity, PrimaryColumn, Column } from "typeorm"


@Entity({ schema: 'portal_consular_dev' })
export class SchedulingStatus {

    @PrimaryColumn()
    @IsString()
    code: string

    @Column({ nullable: false })
    @IsString()
    description: string

    constructor(code: string) {
        this.code = code;
    }

    getCode(): string {
        return this.code;
    }

}
