import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Scheduling } from "./Scheduling"
import { User } from "./User"

/**
 * Save the scheduling history: closed date, available flag. 
 * if numCollaborator is equal number of the booking doned, then: Save closed date as new Date and available=false
 */
@Entity({ schema: 'portal_consular_dev' })

export class SchedulingHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number


    @Column({ nullable: false, type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date

    @Column({ type: 'date', nullable: true })
    updatedDate: Date

    @Column({ nullable: false })
    date: string

    @Column({ nullable: false })
    chosenHour: string

    @Column()
    available: boolean

    @ManyToOne(() => Scheduling, (scheduling) => scheduling.id, { eager: true, nullable: false })
    scheduling: Scheduling


    @ManyToOne(() => User, (updatedBy) => updatedBy.id, { eager: true })
    updatedBy: User

}
