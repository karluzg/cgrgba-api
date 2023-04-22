import { HttpCodes } from "../response/HttpCodes";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";

export class UnauthorizedOperationException extends OperationExecption{
    constructor(message:string){
        super(message,HttpCodes.UNAUTHORIZED, ErrorExceptionClass.UNAUTHORIZED)
    }
}