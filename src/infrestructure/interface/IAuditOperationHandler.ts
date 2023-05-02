import { ResultTemplate } from "../../infrestructure/template/ResultTemplate";
import { IOperation } from "./IOperation";
import { Params } from "../template/ParamsTemplate";

export interface IAuditOperationHandler{
    execute<R extends ResultTemplate, P extends Params>(operation: IOperation<R,P>, params: P): R
}