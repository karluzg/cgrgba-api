import { Field } from "./Field"

export class OperationExecption extends Error {

    public readonly statusCode: number;
    public readonly errorClasseName: string;
    public field: Field;

    constructor(field: Field, statusCode: number, errorClasseName: string, message: string) {
        super(message)
        this.statusCode = statusCode;
        this.errorClasseName = errorClasseName;
        this.field = field;


    }
}

