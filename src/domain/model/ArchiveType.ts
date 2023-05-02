import { Entity, Column, PrimaryColumn} from "typeorm"



@Entity({schema:"portalConsular"})
export class ArchiveType {

    @PrimaryColumn()
    archiveType : String
    
    @Column()
    archiveTypeDescription : String
}
