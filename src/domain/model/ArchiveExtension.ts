import { Entity, Column, PrimaryColumn} from "typeorm"


@Entity({schema:"portalConsular"})
export class ArchiveExtension {

    @PrimaryColumn()
    name : String
    
    @Column()
    nimeType : String

    @Column()
    description : String
}

