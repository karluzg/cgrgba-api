import { ResultTemplate } from "./ResultTemplate";

export class EmailResultTemplate  {

    private result: Object;
    get getResult(): Object {
        return this.result;
    }
    set setSetResult(result: Object) {

        this.result = result;

    }


}