import { Entity, Column, PrimaryColumn} from "typeorm"



@Entity({ schema: 'portal_consular_dev' })
export class ArchiveType {

    @PrimaryColumn()
    name : String
    
    @Column()
    description : String
}
