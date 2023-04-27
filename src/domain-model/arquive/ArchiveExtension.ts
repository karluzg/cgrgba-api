import { Entity, Column, ManyToOne, PrimaryColumn} from "typeorm"


@Entity()
export class ArchiveExtension {

    @PrimaryColumn()
    archiveExtension : String
    
    @Column()
    mimeType : String

    @Column()
    extensionDescriptionArchive : String
}

