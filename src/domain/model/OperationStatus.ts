import { Entity, Column,  PrimaryColumn} from "typeorm"



@Entity({ schema: 'portal_consular_dev' })
export class OperationStatus {

    @PrimaryColumn()
    code : String //ERROR, PENDIND, SUCCESS
    
    @Column()
    description : String
}
