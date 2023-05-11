import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { Citizen } from "./Citizen"

@Entity({schema:"portalConsular"})
export class Scheduling {

    @PrimaryGeneratedColumn({ type:"bigint"})
    id: number


    @Column({ nullable: false })
    schedulingDate: string

    @Column({ nullable: false })
    chosenHour: string

    @ManyToOne(() => Citizen, (citizen) => citizen.id, { eager: true, nullable: false })
    citizen: Citizen

    @Column({ nullable: false })
    service: string

    @Column({ nullable: false })
    category: string

    @Column({ nullable: false })
    status: string

    @Column({ nullable: false, type: 'timestamp' })
    creationDate: Date

}
