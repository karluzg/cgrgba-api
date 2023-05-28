import { HttpCodes } from "../response/enum/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";
import { Field } from "./enum/Field";

export class NotImplementedException extends OperationExecption{

    constructor(field: Field, message: string, details ?:any) {
        super(field, HttpCodes.NOT_IMPLEMENTED, ErrorExceptionClass.NOT_IMPLEMENTED, message, details)
        
    }
}