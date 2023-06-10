import { IsObject } from "class-validator";
import { HttpCodes } from "../response/enum/HttpCode";
import { Field } from "../exceptions/enum/Field";
import { ResultInfo } from "../response/ResultInfo";
import { MiddlewareBusinessMessage } from "../response/enum/MiddlewareCustomMessage";

export class ResultTemplate {


    protected status: Object;

    get getStatus(): Object {
        return this.status;
    }

    getSuccessfullyMessage() {
        let message: Map<string, ResultInfo> = new Map();
        message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SUCCESS_MESSAGE));
        this.status = {
            INFO: { ...message.get(Field.INFO) },
        };
    }
}





