import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { Citizen } from "./Citizen"
import { User } from "./User"
import { SchedulingStatus } from "./SchedulingStatus"
import { SchedulingCategory } from "./SchedulingCategory"
import { Service } from "./Service"
import { ISchedulingActivable } from "./interface/ISchedulingActivable"
import { IsDate } from "class-validator"
import { SchedulingStatusEnum } from "./enum/SchedulingStatusEnum"
import { EnumOperationTemplate } from "../../infrestructure/template/EnumOperationTemplate"

@Entity({ schema: 'portal_consular_dev' })
export class Scheduling extends  EnumOperationTemplate<SchedulingStatusEnum> implements ISchedulingActivable {


    @PrimaryGeneratedColumn({ type:"bigint"})
    id: number


    @Column({ nullable: false })
    date: string

    @Column({ nullable: false })
    chosenHour: string

    @ManyToOne(() => Citizen, (citizen) => citizen.schedulings, { eager: true, nullable: false })
    citizen: Citizen

    @Column({ nullable: false })
    hour: number

    @Column({ nullable: false })
    minute: number

    @ManyToOne(() => Service, (service) => service.code, { eager: true })
    service: Service


    @ManyToOne(() => SchedulingStatus, (status) => status.code, { eager: true })
    status: SchedulingStatus

    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date


    @ManyToOne(() => User, (attendBy) => attendBy.id, { eager: true })
    attendBy: User

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
