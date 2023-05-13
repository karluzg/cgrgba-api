import { IsObject } from "class-validator";
import { HttpCode } from "../response/enum/HttpCode";

export class ResultTemplate {

    @IsObject()
    private status: Object;
    get getErrorMessages(): Object {
        return this.status;
    }
    set setErrorMessages(errorMessages: Object) {

        this.status = errorMessages;

    }


}