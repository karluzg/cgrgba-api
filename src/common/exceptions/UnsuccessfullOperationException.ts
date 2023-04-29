import { HttpCode } from "../response/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";

export class UnsuccessfullOperationException extends OperationExecption{
    constructor(message:string){
        super(message,HttpCode.INTERNAL_SERVER_ERROR, ErrorExceptionClass.UNSUCCESSFULLY)
    }
}