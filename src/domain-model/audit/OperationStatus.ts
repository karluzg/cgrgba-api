import { Entity, Column, ManyToOne, PrimaryColumn} from "typeorm"



@Entity()
export class OperationStatus {

    @PrimaryColumn()
    code : String //ERROR, PENDIND, SUCCESS
    
    @Column()
    description : String
}
