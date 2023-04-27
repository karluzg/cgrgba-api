import { Result } from "../../engine-interface/Result";
import { IOperation } from "./IOperation";
import { Params } from "./Params";

export interface IAuditOperationHandler{
    execute<R extends Result, P extends Params>(operation: IOperation<R,P>, params: P): R
}