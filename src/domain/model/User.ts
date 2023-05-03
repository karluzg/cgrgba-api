import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { UserRole } from "./UserRole"
import { UserStatusEnum } from "./enum/UserStatus"
import { IUserActivable } from "./interface/IUserActivable"

@Entity({schema:"portalConsular"})
export class User implements IUserActivable {
   
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column({unique: true,
    length:50,
    nullable:false})
    UserFullName: string

    @Column({unique:true,
    length:21})
    UserMobileNumber: string

    @Column({unique:true,
    length:34,
    nullable:false})
    UserEmail: string

    @Column({nullable:false})
    UserCreationDate: Date

    @Column()
    passwordHash: string

    @Column()
    passwordSalt: string

    
    @Column({type:'enum', enum:UserStatusEnum})
    userStatus: UserStatusEnum

    //nullfy -> when a Parent entity is deleted or its relationship with a Child entity is broken,
    // the foreign key value in the Child table will be set to null.

    @OneToMany(() => UserRole, (userRoles) => userRoles.user, {cascade:true, orphanedRowAction:"nullify"})
    // lazy relationship - > The entities in lazy relations are loaded once you access them. Must have Promise as type
    userRoles: Promise<UserRole[]> 

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
