import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Scheduling } from "./Scheduling"


@Entity({ schema: 'portal_consular_dev' })
export class Citizen {


    @PrimaryGeneratedColumn({type:"bigint"})
    id: number


    @Column({
        length: 50,
    nullable:false})
    fullName: string

    @Column({unique:true,
        length:34,
        nullable:false})
        email: string


    @Column({
        length: 21,
    nullable:false})
    mobileNumber: string

    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date

    @OneToMany(() => Scheduling, scheduling => scheduling.citizen, { cascade: true })
    schedulings: Scheduling[];
   
}
