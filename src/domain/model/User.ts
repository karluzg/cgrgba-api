import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from "typeorm"
import { UserStatusEnum } from "./enum/UserStatusEnum"
import { IActivable } from "./interface/IUserActivable"
import { Role } from "./Role"
import { IsDate, IsNumber, IsString } from "class-validator"

@Entity({ schema: "portalConsular" })
export class User implements IActivable {

    @IsNumber()
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @IsString()
    @Column({
        length: 50,
        nullable: false
    })
    fullName: string

    @IsString()
    @Column({
        length: 21, unique: true
    })
    mobileNumber: string

    @IsString()
    @Column({
        unique: true,
        length: 34,
        nullable: false
    })
    email: string

    @IsDate()
    @Column({ nullable: false, type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date

    @IsString()
    @Column()
    passwordHash: string

    @IsString()
    @Column()
    passwordSalt: string

    @Column({ nullable: false, default: 3 })
    passwordTry: number;
    


    @Column({ type: 'enum', enum: UserStatusEnum, nullable: false })
    status: UserStatusEnum

    //nullfy -> when a Parent entity is deleted or its relationship with a Child entity is broken,
    // the foreign key value in the Child table will be set to null.

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

    active(): void {
        this.status = UserStatusEnum.ACTIVE
    }
    suspend(): void {
        this.status = UserStatusEnum.SUSPENDED
    }
    remove(): void {
        this.status = UserStatusEnum.REMOVED
    }


}
