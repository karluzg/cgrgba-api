import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, AfterLoad, BeforeUpdate } from "typeorm"
import { Scheduling } from "./Scheduling"
import { EncryptTemplate } from "../../infrestructure/template/EncryptTemplate"


@Entity({ schema: 'portal_consular_dev' })
export class Citizen {


    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number


    @Column({
        length: 50,
        nullable: false
    })
    fullName: string

    @Column({
        unique: true,
        length: 34,
        nullable: false
    })
    email: string


    @Column({
        length: 21,
        nullable: false
    })
    mobileNumber: string

    @Column({ nullable: false, type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date

    @OneToMany(() => Scheduling, scheduling => scheduling.citizen, { cascade: true })
    schedulings: Scheduling[];


    @BeforeInsert()
    @BeforeUpdate()
    private encryptColumn() {
        this.fullName = EncryptTemplate.encryptColumn(this.fullName);
        this.email = EncryptTemplate.encryptColumn(this.email);
        this.mobileNumber = EncryptTemplate.encryptColumn(this.mobileNumber);
    }

    @AfterLoad()
    private decryptColumn() {
        this.fullName = EncryptTemplate.decryptedColumn(this.fullName);
        this.email = EncryptTemplate.decryptedColumn(this.email);
        this.mobileNumber = EncryptTemplate.decryptedColumn(this.mobileNumber);
    }

}


