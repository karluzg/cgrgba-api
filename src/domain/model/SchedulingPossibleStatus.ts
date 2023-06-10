import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SchedulingStatus } from "./SchedulingStatus"

@Entity({ schema: 'portal_consular_dev' })
export class SchedulingPossibleStatus {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @ManyToOne(() => SchedulingStatus, (currentStatus) => currentStatus.code)
    currentStatus: SchedulingStatus


    @ManyToOne(() => SchedulingStatus, (nextStatus) => nextStatus.code)
    nextStatus: SchedulingStatus
}
