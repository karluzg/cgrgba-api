import { IsObject } from "class-validator";
import { HttpCodes } from "../response/enum/HttpCode";

export class ResultTemplate {

    @IsObject()
    private status: Object;
    get getStatus(): Object {
        return this.status;
    }
    set setStatus(errorMessages: Object) {

        this.status = errorMessages;

    }


}