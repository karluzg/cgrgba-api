import { HttpCodes } from "../response/enum/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { Field } from "./enum/Field";
import { OperationExecption } from "./OperatonException";


export class UnauthorizedOperationException extends OperationExecption {
    constructor(field: Field, message: string, details ?:any) {
        super(field, HttpCodes.UNAUTHORIZED, ErrorExceptionClass.UNAUTHORIZED, message, details)
    }
}