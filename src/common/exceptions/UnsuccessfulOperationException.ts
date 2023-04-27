import { HttpCode } from "../response/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";

export class UnsuccessfulOperationException extends OperationExecption{
    constructor(message:string){
        super(message,HttpCode.INTERNAL_SERVER_ERROR, ErrorExceptionClass.INTERNAL_SERVER_ERROR)
    }
}