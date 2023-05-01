import { HttpCode } from "../response/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";
import { Field } from "./Field";
export class InvalidParametersException extends OperationExecption {

    constructor(field: Field, message: string) {
        super(field, HttpCode.BAD_REQUEST, ErrorExceptionClass.INVALID_PARAMETERS, message)

    }
}