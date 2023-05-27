import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm"
import { Citizen } from "./Citizen"
import { User } from "./User"
import { SchedulingStatus } from "./SchedulingStatus"
import { Service } from "./Service"
import { ISchedulingActivable } from "./interface/ISchedulingActivable"
import { IsDate, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"
import { SchedulingStatusEnum } from "./enum/SchedulingStatusEnum"
import { EnumOperationTemplate } from "../../infrestructure/template/EnumOperationTemplate"
import { Type } from "class-transformer"

@Entity({ schema: 'portal_consular_dev' })
export class Scheduling extends  EnumOperationTemplate<SchedulingStatusEnum> implements ISchedulingActivable {


    @PrimaryGeneratedColumn({ type:"bigint"})
    @IsNumber()
    id: number

    @Column({ nullable: false })
    @IsString()
    date: string

    @Column({ nullable: false })
    @IsString()
    chosenHour: string

    @IsObject()
    @ValidateNested()
    @Type(() => User)
    @ManyToOne(() => Citizen, (citizen) => citizen.schedulings, { eager: true, nullable: false })
    citizen: Citizen

    @IsString()
    @Column({ nullable: false })
    hour: number

    @IsString()
    @Column({ nullable: false })
    minute: number

    @IsObject()
    @ValidateNested()
    @Type(() => Service)
    @ManyToOne(() => Service, (service) => service.code, { eager: true })
    @JoinColumn({ name: 'service_code', referencedColumnName: 'code' })
    service: Service

    @IsObject()
    @ValidateNested()
    @Type(() => SchedulingStatus)
    @ManyToOne(() => SchedulingStatus, (status) => status.code, { eager: true })
    status: SchedulingStatus

    @IsString()
    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date

    @IsObject()
    @ValidateNested()
    @Type(() => User)
    @ManyToOne(() => User, (attendBy) => attendBy.id, { eager: true })
    attendBy: User

    @IsObject()
    @ValidateNested()
    @Type(() => User)
    @ManyToOne(() => User, (attendBy) => attendBy.id, { eager: true })
    updateBy: User

    @IsDate()
    @Column({ nullable: true, type: 'timestamp' })
    attendDate: Date

    @IsDate()
    @Column({ nullable: true, type: 'timestamp' })
    revokingDate: Date

    @IsDate()
    @Column({ nullable: true, type: 'timestamp' })
    lastPasswordUpdate: Date

    constructor() {
        super(SchedulingStatusEnum)
        this.setStatusEnum(SchedulingStatusEnum.FOR_ANSWERING);
    }


    getStatusEnum(): SchedulingStatusEnum {
        return this.getEnumKey(this.status.code)
    }

    public setStatusEnum(statusEnum: SchedulingStatusEnum | null): void {

        this.status = statusEnum === null ? null : new SchedulingStatus(this.getKey(statusEnum))
    }


    answering(): void {
        this.setStatusEnum(SchedulingStatusEnum.ANSWERED)
        this.attendDate = new Date();
    }
    canceled(): void {
        this.setStatusEnum(SchedulingStatusEnum.CANCELED)
        this.revokingDate = new Date();
    }


}
