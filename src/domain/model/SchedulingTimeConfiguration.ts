import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Hour } from "./Hour"



@Entity({ schema: "portalConsular" })

export class SchedulingTimeConfiguration {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ nullable: false, type: 'timestamp' })
    creationDate: Date

    @Column({ type: 'date', unique: true, nullable: false })
    schedulingBeginDate: Date

    @Column()
    beginLunchTime: string

    @Column()
    endLunchTime: string

    @Column({ type: 'integer', nullable: false })
    serviceInterval: number

    @Column({ type: 'integer', nullable: false })
    availableCollaboratorNumber: number


    @OneToMany(() => Hour, hour => hour.schedulingTimeConfiguration, { cascade: true })
     hours: Hour[];


}
