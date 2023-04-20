/**
 * P - parameters
 * R - Result
 */

import { Result } from "../../common/response/Result";
import { Params } from "./Params";

export interface IOperation<R extends Result, P extends Params>{

validateParams(params:P): void;
execute(params:P):R;    

}