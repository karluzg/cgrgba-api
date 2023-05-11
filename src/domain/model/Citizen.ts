import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity({schema:"portalConsular"})
export class Citizen {


    @PrimaryGeneratedColumn({type:"bigint"})
    id: number


    @Column({
        length: 50,
    nullable:false})
    citizenFullName: string

    @Column({unique:true,
        length:34,
        nullable:false})
        citizenEmail: string


    @Column({
        length: 21,
    nullable:false})
    citizenMobileNumber: string

    @Column({nullable:false})
    citizenCreationDate: Date

   
}
