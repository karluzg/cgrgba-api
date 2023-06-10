import { OperationExecption } from "../../../infrestructure/exceptions/OperatonException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";

export class SchedulingControllerError extends OperationExecption {
    constructor(field: Field, statusCode: number, errorClasseName: string, message: string, details?: any) {
        super(field, statusCode, errorClasseName, message, details);
        Object.setPrototypeOf(this, SchedulingControllerError.prototype);
    }
}

