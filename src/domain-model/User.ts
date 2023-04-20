import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    capitals: string

    @Column()
    nomeProprio: string

    @Column()
    campo: string

    @Column()
    ages: number

    @Column()
    region: string

      
    @Column()
    langui: string
}
