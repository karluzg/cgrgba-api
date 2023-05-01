import { HttpCode } from "../response/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { Field } from "./Field";
import { OperationExecption } from "./OperatonException";


export class ForbiddenOperationException extends OperationExecption{
    constructor(field: Field, message: string) {
        super(field, HttpCode.FORBIDDEN, ErrorExceptionClass.FORBIDDEN, message)
    }
}