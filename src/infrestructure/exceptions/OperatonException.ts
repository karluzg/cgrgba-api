import { Field } from "./enum/Field"

export class OperationExecption extends Error {

    public readonly statusCode: number;
    public readonly errorClasseName: string;
    public field: Field;
    public details? : any;

    constructor(field: Field, statusCode: number, errorClasseName: string, message: string,details ?:any ) {
        super(message)
        this.statusCode = statusCode;
        this.errorClasseName = errorClasseName;
        this.field = field;
        this.details =details ;
    }
}

