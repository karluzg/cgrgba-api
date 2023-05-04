import { IOperation } from "../../interface/IOperation";
import { IAuditOperationHandler } from "../../interface/IAuditOperationHandler";
import { ParamsTemplate } from "../../template/ParamsTemplate";
import { ResultTemplate } from "../../template/ResultTemplate";


export class AuditOperationDecorator implements IAuditOperationHandler {
    execute<R extends ResultTemplate, P extends ParamsTemplate>(operation: IOperation<R, P>, params: P): Promise<R> {
        throw new Error("AutidOperationDecorator not implemented.");
    }

}