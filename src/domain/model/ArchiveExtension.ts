import { Entity, Column, PrimaryColumn} from "typeorm"


@Entity({schema:"portalConsular"})
export class ArchiveExtension {

    @PrimaryColumn()
    archiveExtension : String
    
    @Column()
    mimeType : String

    @Column()
    extensionDescriptionArchive : String
}

