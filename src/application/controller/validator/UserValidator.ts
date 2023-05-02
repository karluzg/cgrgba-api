import { ResponseCode } from "../../../infrestructure/response/enum/ResponseCode";
import { ResultInfo } from "../../../infrestructure/response/ResultInfo";
import { IAuthParams } from "../../../infrestructure/interface/IAuthParams";

export  class UserValidator{

public static isInvalidAuthenticationToken(authParams:IAuthParams, errorInfos: Map<string, ResultInfo>):boolean {

    if(authParams.getAuthenticationToken.length==0){

      //  errorInfos.set("TOKEN:", new ResultInfo(ResponseCode.INVALID_TOKEN,"Token de autenticação obrigatório"));
    }
    return true; // incompleted function. Must thwro properly error
}

}