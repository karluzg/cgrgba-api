import { HttpCode } from "../response/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";

export class InvalidParametersException extends OperationExecption{
 
    constructor(message:string,){
        super(message,HttpCode.BAD_REQUEST, ErrorExceptionClass.INVALID_PARAMETERS)

    }
}