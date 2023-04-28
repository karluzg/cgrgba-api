
import { Entity, Column, ManyToOne, PrimaryColumn} from "typeorm"
import { UserOperation } from "./UserOperation"

@Entity({schema:"portalConsular"})
export class Error {

    @PrimaryColumn()
    errorCode : string
    
    @Column()
    errorMessag:string
    


    @ManyToOne(()=> UserOperation,(userOperation)=> userOperation.id ,{eager:true, nullable:false})
    userOperation:UserOperation
}
