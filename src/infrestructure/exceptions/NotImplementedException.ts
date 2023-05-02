import { HttpCode } from "../response/enum/HttpCode";
import { ErrorExceptionClass } from "./ErrorExceptionClass";
import { OperationExecption } from "./OperatonException";
import { Field } from "./enum/Field";

export class NotImplementedException extends OperationExecption{

    constructor(field: Field, message: string) {
        super(field, HttpCode.NOT_IMPLEMENTED, ErrorExceptionClass.NOT_IMPLEMENTED, message)
        
    }
}