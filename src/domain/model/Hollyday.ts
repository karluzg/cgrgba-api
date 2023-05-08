import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ schema: "portalConsular" })
export class Hollyday {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @Column({ nullable: false })
    hollydayDate: Date

}