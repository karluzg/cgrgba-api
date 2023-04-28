import { HttpCode } from "../response/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";


export class UnauthorizedOperationException extends OperationExecption{
    constructor(message:string){
        super(message,HttpCode.UNAUTHORIZED, ErrorExceptionClass.UNAUTHORIZED)
    }
}