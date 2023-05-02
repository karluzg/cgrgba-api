import { ResultInfo } from "../../../infrestructure/response/ResultInfo";
import { IAuthParams } from "../../../infrestructure/interface/IAuthParams";

export  class ParamsValidator{

public static isInvalidAuthenticationToken(authParams:IAuthParams, errorInfos: Map<string, ResultInfo>):boolean {

    if(authParams.getAuthenticationToken.length==0){

      //  errorInfos.set("TOKEN:", new ResultInfo(ResponseCode.INVALID_TOKEN,"Token de autenticação obrigatório"));
    }
    return true; // incompleted function. Must thwro properly error
}

}