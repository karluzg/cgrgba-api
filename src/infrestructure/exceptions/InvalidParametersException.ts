import { HttpCode } from "../response/enum/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";
import { Field } from "./enum/Field";
export class InvalidParametersException extends OperationExecption {

    constructor(field: Field, message: string, details ?:any) {
        super(field, HttpCode.BAD_REQUEST, ErrorExceptionClass.INVALID_PARAMETERS, message,details )

    }
}