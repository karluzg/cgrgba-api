import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm"
import { Hour } from "./Hour"


@Entity({ schema: "portalConsular" })
// show only list of scheduling time hour for the date and hour that was not reached the numberOfCollaboratorAvailable in scheduling
export class SchedulingTime {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ unique: true, nullable: false })
    schedulingDate: Date // to do the instance of this date, just do this -> entity.date = new Date('2023-05-04');

    @ManyToMany(() => Hour, { lazy: true, nullable: false, cascade: true })
    @JoinTable({ name: "SchedulingTime_hour" })
    hours: Hour[]  //-> entity.hours = ['10:00:00', '12:00:00', '14:00:00'];


    @Column()
    numCollaboratorAvailable: number 


}
