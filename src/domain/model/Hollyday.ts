import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ schema: 'portal_consular_dev' })
export class Hollyday {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @Column({ nullable: false })
    date: Date

}