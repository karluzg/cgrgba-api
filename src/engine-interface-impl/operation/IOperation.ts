/**
 * P - parameters
 * R - Result
 */

import { Result } from "../../engine-interface/Result";
import { Params } from "./Params";

export interface IOperation<R extends Result, P extends Params>{

 getOperationId():number
validateParams(params:P): void;
execute(params:P):R;    

}