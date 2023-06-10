import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, AfterLoad, BeforeUpdate, AfterInsert, AfterUpdate } from "typeorm"
import { Scheduling } from "./Scheduling"
import { EncryptTemplate } from "../../infrestructure/template/EncryptTemplate"


@Entity({ schema: 'portal_consular_dev' })
export class Citizen {


    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number


    @Column({
        nullable: false
    })
    fullName: string

    @Column({
        unique: true,
        nullable: false
    })
    email: string


    @Column({
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
    @AfterInsert()
    @AfterUpdate()
    private decryptColumn() {
        this.fullName = EncryptTemplate.decryptedColumn(this.fullName);
        this.email = EncryptTemplate.decryptedColumn(this.email);
        this.mobileNumber = EncryptTemplate.decryptedColumn(this.mobileNumber);
    }

}


