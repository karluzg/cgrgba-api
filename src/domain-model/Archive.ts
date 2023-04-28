import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { ArchiveExtension } from "./ArchiveExtension"
import { ArchiveType } from "./ArchiveType"


@Entity({schema:"portalConsular"})
export class Archive {

    @PrimaryGeneratedColumn({type:"bigint"})
    id:number
    
    @Column()
    archiveName : String

    @Column()
    filePath : String

    @Column()
    archiveCreationDate : Date


   @ManyToOne(()=> ArchiveExtension,(archiveExtension)=> archiveExtension.archiveExtension,{eager:true, nullable:false})
   archiveExtension:ArchiveExtension

   
   @ManyToOne(()=> ArchiveType,(archiveType)=> archiveType.archiveType,{eager:true, nullable:false})
   archiveType:ArchiveType
}
