/**
 * P - parameters
 * R - Result
 */

import { ResultTemplate } from "../../infrestructure/template/ResultTemplate";
import { ParamsTemplate } from "../template/ParamsTemplate";

export interface IOperation<R extends ResultTemplate, P extends ParamsTemplate> {

    getOperationId(): number
    validateParams(params: P): Promise<void>;
    execute(params: P): Promise<R>;

}