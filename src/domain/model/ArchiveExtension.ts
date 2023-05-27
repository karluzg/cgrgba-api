import { Entity, Column, PrimaryColumn} from "typeorm"


@Entity({ schema: 'portal_consular_dev' })
export class ArchiveExtension {

    @PrimaryColumn()
    name : String
    
    @Column()
    nimeType : String

    @Column()
    description : String
}

