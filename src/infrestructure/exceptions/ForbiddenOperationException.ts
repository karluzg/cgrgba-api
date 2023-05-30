import { HttpCodes } from "../response/enum/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { Field } from "./enum/Field";
import { OperationExecption } from "./OperatonException";


export class ForbiddenOperationException extends OperationExecption{
    constructor(field: Field, message: string,details ?:any) {
        super(field, HttpCodes.FORBIDDEN, ErrorExceptionClass.FORBIDDEN, message, details)
    }
}