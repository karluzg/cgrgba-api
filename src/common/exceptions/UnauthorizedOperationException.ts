import { HttpCode } from "../response/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { Field } from "./Field";
import { OperationExecption } from "./OperatonException";


export class UnauthorizedOperationException extends OperationExecption {
    constructor(field: Field, message: string) {
        super(field, HttpCode.UNAUTHORIZED, ErrorExceptionClass.UNAUTHORIZED, message)
    }
}