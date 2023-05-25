import { PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
import { SchedulingStatus } from "./SchedulingStatus";

@Entity({ schema: 'portal_consular_dev' })
export class SchedulingPossibleStatus {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => SchedulingStatus, (currentStatus) => currentStatus.code, { nullable: false })
    currentStatus: SchedulingStatus;


    @ManyToOne(() => SchedulingStatus, (nextStatus) => nextStatus.code, { nullable: false })
    nextStatus: SchedulingStatus;
}
