import { Entity, Column, ManyToOne, PrimaryColumn} from "typeorm"



@Entity()
export class ArchiveType {

    @PrimaryColumn()
    archiveType : String
    
    @Column()
    archiveTypeDescription : String
}
