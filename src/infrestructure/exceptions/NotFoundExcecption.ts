import { HttpCodes } from "../response/enum/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { Field } from "./enum/Field";
import { OperationExecption } from "./OperatonException";


export class NotFoundException extends OperationExecption {
    constructor(field: Field, message: string, details ?:any) {
        super(field, HttpCodes.NOT_FOUND, ErrorExceptionClass.NOT_FOUND, message, details)
    }
}