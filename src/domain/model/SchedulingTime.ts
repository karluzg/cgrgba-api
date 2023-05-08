import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"



@Entity({ schema: "portalConsular" })
// show only list of scheduling time hour for the date and hour that was not reached the numberOfCollaboratorAvailable in scheduling
export class SchedulingTime {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'date', unique: true, nullable: false })
    schedulingBeginDate: Date // to do the instance of this date, just do this -> entity.date = new Date('2023-05-04');

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
