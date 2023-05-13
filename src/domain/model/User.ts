import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from "typeorm"
import { UserStatusEnum } from "./enum/UserStatusEnum"
import { IActivable } from "./interface/IUserActivable"
import { Role } from "./Role"

@Entity({schema:"portalConsular"})
export class User implements IActivable {
   
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column({
    length:50,
    nullable:false})
    fullName: string

    @Column({
        length: 21, unique: true
    })
    mobileNumber: string

    @Column({
        unique: true, 
    length:34,
    nullable:false})
    email: string

    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date

    @Column()
    passwordHash: string

    @Column()
    passwordSalt: string

    
    @Column({ type: 'enum', enum: UserStatusEnum, nullable: false })
    userStatus: UserStatusEnum

    //nullfy -> when a Parent entity is deleted or its relationship with a Child entity is broken,
    // the foreign key value in the Child table will be set to null.
   
    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

    active(): void {
       this.userStatus=UserStatusEnum.ACTIVE
    }
    suspend(): void {
        this.userStatus=UserStatusEnum.SUSPENDED
    }
    remove(): void {
        this.userStatus=UserStatusEnum.REMOVED
    }


}
