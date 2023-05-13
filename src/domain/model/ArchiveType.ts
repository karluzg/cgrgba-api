import { Entity, Column, PrimaryColumn} from "typeorm"



@Entity({schema:"portalConsular"})
export class ArchiveType {

    @PrimaryColumn()
    name : String
    
    @Column()
    description : String
}
