import { Entity, Column,  PrimaryColumn} from "typeorm"



@Entity({schema:"portalConsular"})
export class OperationStatus {

    @PrimaryColumn()
    code : String //ERROR, PENDIND, SUCCESS
    
    @Column()
    description : String
}
