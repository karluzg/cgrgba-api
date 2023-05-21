import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from "typeorm"
import { UserStatusEnum, UserStatusMapper } from "./enum/UserStatusEnum"
import { IUserActivable } from "./interface/IUserActivable"
import { Role } from "./Role"
import { IsDate, IsNumber, IsString } from "class-validator"
import { UserStatus } from "./UserStatus"

@Entity({ schema: 'portal_consular_dev' })
export class User implements IUserActivable {


    @IsNumber()
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @IsDate()
    @Column({ nullable: false, type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date

    @IsDate()
    @Column({ nullable: true, type: 'timestamp' })
    activationDate: Date

    @IsDate()
    @Column({ nullable: true, type: 'timestamp' })
    revokingDate: Date

    @IsDate()
    @Column({ nullable: true, type: 'timestamp' })
    lastPasswordUpdate: Date


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

    @IsString()
    @Column()
    passwordHash: string

    @IsString()
    @Column()
    passwordSalt: string

    @Column({ nullable: false, default: 3 })
    passwordTry: number;
    


    @ManyToOne(() => UserStatus, (status) => status.code, { eager: true, nullable: false })
    status: UserStatus


    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]


    constructor() {
        this.setStatusEnum(UserStatusEnum.NEW);
    }

    getStatusEnum(): UserStatusEnum {
        return UserStatusMapper.from(this.status)
    }

    public setStatusEnum(statusEnum: UserStatusEnum | null): void {

        this.status = statusEnum === null ? null : UserStatusMapper.status(statusEnum)
    }

    suspend(): void {
        this.setStatusEnum(UserStatusEnum.SUSPENDED)
        this.revokingDate = new Date();
    }

    remove(): void {
        this.setStatusEnum(UserStatusEnum.REMOVED)
        this.revokingDate = new Date();
    }

    getActivationDate(): Date {
        return this.activationDate;
    }

    getRevokingDate(): Date {
        return this.revokingDate;
    }

    activate(): void {
        this.setStatusEnum(UserStatusEnum.ACTIVE)
        this.activationDate = new Date();
        this.lastPasswordUpdate = new Date();
        this.revokingDate = null;
    }

    isActive(): boolean {
        return UserStatusEnum.ACTIVE == (this.getStatusEnum());
    }


}
