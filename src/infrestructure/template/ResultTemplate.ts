import { HttpCode } from "../response/enum/HttpCode";

export class ResultTemplate {

    private status: Object;
    get getErrorMessages(): Object {
        return this.status;
    }
    set setErrorMessages(errorMessages: Object) {

        this.status = errorMessages;

    }


}