import { HttpCode } from "../response/enum/HttpCode";

export class ResultTemplate {

    private errorMessages: Object;
    get getErrorMessages(): Object {
        return this.errorMessages;
    }
    set setErrorMessages(errorMessages: Object) {

        this.errorMessages = errorMessages;

    }


}