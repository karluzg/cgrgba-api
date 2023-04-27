import { IOperation } from "../operation/IOperation";
import { IAuditOperationHandler } from "../operation/IAuditOperationHandler";
import { Params } from "../operation/Params";
import { Result } from "../../engine-interface/Result";


export class AuditOperationDecorator implements IAuditOperationHandler{
    execute<R extends Result, P extends Params>(operation: IOperation<R, P>, params: P): R {
        throw new Error("Method not implemented.");
    }
    
}