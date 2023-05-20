
import { Entity, Column, ManyToOne, PrimaryColumn} from "typeorm"
import { UserOperation } from "./UserOperation"

@Entity({ schema: 'portal_consular_dev' })
export class Error {

    @PrimaryColumn()
    code : string
    
    @Column()
    message:string
    
    @ManyToOne(()=> UserOperation,{eager:true, nullable:false})
    operation:UserOperation
}
