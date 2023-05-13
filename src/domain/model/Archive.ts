import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { ArchiveExtension } from "./ArchiveExtension"
import { ArchiveType } from "./ArchiveType"


@Entity({schema:"portalConsular"})
export class Archive {

    @PrimaryGeneratedColumn({type:"bigint"})
    id:number
    
    @Column()
    name : String

    @Column()
    path : String

    @Column({ nullable: false, type: 'timestamp',default: () => "CURRENT_TIMESTAMP"  })
    creationDate: Date


   @ManyToOne(()=> ArchiveExtension,{eager:true, nullable:false})
   extension:ArchiveExtension

   
   @ManyToOne(()=> ArchiveType,{eager:true, nullable:false})
   type:ArchiveType
}
