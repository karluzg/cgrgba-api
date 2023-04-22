import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    UserFullName: string

    @Column()
    UserMobileNumber: string

    @Column()
    UserEmail: string

    @Column()
    UserCreationDate: Date

    @Column()
    passwordHash: string

    @Column()
    passwordSalt: string

}
