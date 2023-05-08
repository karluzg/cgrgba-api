import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm"
import { Scheduling } from "./Scheduling"

/**
 * Save the scheduling history: closed date, available flag. 
 * if numCollaborator is equal number of the booking doned, then: Save closed date as new Date and available=false
 */
@Entity({ schema: "portalConsular" })

export class SchedulingHistory {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column()
    closedDate: Date // new Date

    @ManyToOne(() => Scheduling, (scheduling) => scheduling.id, { nullable: false, eager: true })
    scheduling: Scheduling

    @Column()
    available: boolean

}
