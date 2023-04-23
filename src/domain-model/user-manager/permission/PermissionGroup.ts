import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, PrimaryColumn} from "typeorm"

@Entity()
export class PermissionGroup{


    @PrimaryColumn()
    permissionGroupCode: string

    @Column()
    permissionGroupDescription: string
}