import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { UserRole } from "../role/UserRole"

@Entity()
export class User {

    @PrimaryGeneratedColumn({type:"bigint"})
    id: number

    @Column({unique: true,
    length:50,
    nullable:false})
    UserFullName: string

    @Column({unique:true,
    length:21,
    nullable:false})
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

    //nullfy -> when a Parent entity is deleted or its relationship with a Child entity is broken,
    // the foreign key value in the Child table will be set to null.

    @OneToMany(() => UserRole, (userRoles) => userRoles.user, {cascade:true, orphanedRowAction:"nullify"})
    // lazy relationship - > The entities in lazy relations are loaded once you access them. Must have Promise as type
    userRoles: Promise<UserRole[]> 

}
