import { ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "./UserStatus";

@Entity({ schema: 'portal_consular_dev' })
export class UserPossibleStatus {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserStatus, (currentStatus) => currentStatus.code, { nullable: false })
    currentStatus: UserStatus;


    @ManyToOne(() => UserStatus, (nextStatus) => nextStatus.code, { nullable: false })
    nextStatus: UserStatus;
}