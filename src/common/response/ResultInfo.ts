
import { ResponseCode } from "./ResponseCode";

export class ResultInfo {
    private  type:ResponseCode /*  ERROR | INFO */
    private userMessage:string;

    constructor(type:ResponseCode, userMessage:string){
        this.type=type;
        this.userMessage=userMessage;
    }

    get getType():ResponseCode{
        return this.type;
    }
    set setType(type:ResponseCode){
        this.type=type;
    }
}