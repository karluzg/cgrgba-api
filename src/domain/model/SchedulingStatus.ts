import { IsString, IsObject, ValidateNested } from "class-validator";
import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm"
import { Type } from 'class-transformer';



@Entity({ schema: 'portal_consular_dev' })
export class SchedulingStatus {

    @PrimaryColumn()
    @IsString()
    code: string

    @Column({ nullable: false })
    @IsString()
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
