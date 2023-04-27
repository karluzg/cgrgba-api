import { HttpCode } from "../response/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";

export class NotImplementedException extends OperationExecption{

    constructor(message:string){
        super(message,HttpCode.NOT_IMPLEMENTED, ErrorExceptionClass.NOT_IMPLEMENTED)
        
    }
}