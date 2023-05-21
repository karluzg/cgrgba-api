import { PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { SchedulingStatus } from "./SchedulingStatus";


export class SchedulingPossibleStatus {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => SchedulingStatus, (currentStatus) => currentStatus.code, { nullable: false })
    currentStatus: SchedulingStatus;


    @ManyToOne(() => SchedulingStatus, (nextStatus) => nextStatus.code, { nullable: false })
    nextStatus: SchedulingStatus;
}
