import { HttpCode } from "../common/response/HttpCode";

export class Result {

    private errorMessages: Object;
    get getErrorMessages(): Object {
        return this.errorMessages;
    }
    set setErrorMessages(errorMessages: Object) {

        this.errorMessages = errorMessages;

    }


}