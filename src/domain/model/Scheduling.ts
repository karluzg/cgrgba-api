import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { Citizen } from "./Citizen"

@Entity({schema:"portalConsular"})
export class Scheduling {

    @PrimaryGeneratedColumn({ type:"bigint"})
    id: number


    @Column({ nullable: false })
    date: string

    @Column({ nullable: false })
    chosenHour: string

    @ManyToOne(() => Citizen, (citizen) => citizen.schedulings, { eager: true, nullable: false })
    citizen: Citizen

    @Column({ nullable: false })
    hour: number

    @Column({ nullable: false })
    minute: number

    @Column({ nullable: false })
    service: string

    @Column({ nullable: false })
    category: string

    @Column({ nullable: false })
    status: string

    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date
}
