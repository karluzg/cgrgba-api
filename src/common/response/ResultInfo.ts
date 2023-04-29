
import { Response } from "express";
import { ResponseCode } from "./ResponseCode";

export class ResultInfo {

    private userErrorMessage: Map<string, ResultInfo>;
    private responseCode:ResponseCode;
    private message:string;
    constructor(){
        this.userErrorMessage== new Map();
    }

    get getErrorMessages(): Map<string, ResultInfo> {
        return this.userErrorMessage;
    }
    set setuserErrorMessage(userErrorMessage:Map<string, ResultInfo>){

    this.userErrorMessage=userErrorMessage;

    }

    get getMessage():string{
        return this.message
    }
 
}