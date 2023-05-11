import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"



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


    @Column('text', { array: true })
    hours: string[]  //-> entity.hours = ['10:00:00', '12:00:00', '14:00:00'];




}
