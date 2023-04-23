import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class Citizen {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true,
    length:50,
    nullable:false})
    citizenFullName: string


    @Column({unique:true,
        length:34,
        nullable:false})
        citizenEmail: string


    @Column({unique:true,
    length:21,
    nullable:false})
    citizenMobileNumber: string

    @Column({nullable:false})
    citizenCreationDate: Date

   
}
