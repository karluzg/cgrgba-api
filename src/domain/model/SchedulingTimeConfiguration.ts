import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Hour } from "./Hour"
import { Exclude } from "class-transformer"



@Entity({ schema: 'portal_consular_dev' })

export class SchedulingTimeConfiguration {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date

    @Column({ type: "date", unique: true, nullable: false })
    beginDate: Date

    @Column({ nullable: false })
    beginWorkTime: string

    @Column({ nullable: false })
    endWorkTime: string

    @Column()
    beginLunchTime: string

    @Column()
    endLunchTime: string

    @Column({ type: 'integer', nullable: false })
    serviceInterval: number

    @Column({ type: 'integer', nullable: false })
    availableCollaboratorNumber: number

    @Exclude()
    @OneToMany(() => Hour, hour => hour.schedulingTimeConfiguration, { cascade: true })
     hours: Hour[];


}
