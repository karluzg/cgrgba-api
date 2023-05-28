import { HttpCodes } from "../response/enum/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";
import { Field } from "./enum/Field";


export class UnsuccessfullOperationException extends OperationExecption{
    constructor(field: Field, message: string, details ?:any) {
        super(field, HttpCodes.INTERNAL_SERVER_ERROR, ErrorExceptionClass.UNSUCCESSFULLY, message, details)
    }
}