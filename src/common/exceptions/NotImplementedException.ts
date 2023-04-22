import { HttpCodes } from "../response/HttpCodes";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";

export class NotImplementedException extends OperationExecption{

    constructor(message:string){
        super(message,HttpCodes.NOT_IMPLEMENTED, ErrorExceptionClass.NOT_IMPLEMENTED)
        
    }
}