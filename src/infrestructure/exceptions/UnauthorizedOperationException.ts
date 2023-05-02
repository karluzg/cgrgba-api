import { HttpCode } from "../response/enum/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { Field } from "./enum/Field";
import { OperationExecption } from "./OperatonException";


export class UnauthorizedOperationException extends OperationExecption {
    constructor(field: Field, message: string) {
        super(field, HttpCode.UNAUTHORIZED, ErrorExceptionClass.UNAUTHORIZED, message)
    }
}