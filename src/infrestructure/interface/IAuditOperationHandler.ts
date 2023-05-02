import { ResultTemplate } from "../../infrestructure/template/ResultTemplate";
import { IOperation } from "./IOperation";
import { ParamsTemplate } from "../template/ParamsTemplate";

export interface IAuditOperationHandler{
    execute<R extends ResultTemplate, P extends ParamsTemplate>(operation: IOperation<R, P>, params: P): R
}