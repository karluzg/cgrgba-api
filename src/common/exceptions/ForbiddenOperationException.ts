import { HttpCode } from "../response/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";

export class ForbiddenOperationException extends OperationExecption{
    constructor(message:string){
        super(message,HttpCode.FORBIDDEN, ErrorExceptionClass.FORBIDDEN)
    }
}