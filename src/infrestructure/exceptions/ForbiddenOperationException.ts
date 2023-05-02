import { HttpCode } from "../response/enum/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { Field } from "./enum/Field";
import { OperationExecption } from "./OperatonException";


export class ForbiddenOperationException extends OperationExecption{
    constructor(field: Field, message: string) {
        super(field, HttpCode.FORBIDDEN, ErrorExceptionClass.FORBIDDEN, message)
    }
}