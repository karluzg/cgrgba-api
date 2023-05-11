import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm"
import { Scheduling } from "./Scheduling"
import { SchedulingTimeConfiguration } from "./SchedulingTimeConfiguration"

/**
 * Save the scheduling history: closed date, available flag. 
 * if numCollaborator is equal number of the booking doned, then: Save closed date as new Date and available=false
 */
@Entity({ schema: "portalConsular" })

export class SchedulingHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number


    @Column({ nullable: false, type: 'timestamp' })
    creationDate: Date
    @Column({ nullable: false })
    schedulingDate: string

    @Column({ nullable: false })
    chosenHour: string

    @Column()
    available: boolean

    @ManyToOne(() => Scheduling, (scheduling) => scheduling.id, { eager: true, nullable: false })
    scheduling: Scheduling

}