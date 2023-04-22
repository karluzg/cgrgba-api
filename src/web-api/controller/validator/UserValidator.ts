import { ResponseCode } from "../../../common/response/ResponseCode";
import { ResultInfo } from "../../../common/response/ResultInfo";
import { AuthParams } from "../../../engine-interface/params/auth/AuthParams";

export  class UserValidator{

public static isInvalidAuthenticationToken(authParams:AuthParams, errorInfos: Map<string, ResultInfo>):boolean {

    if(authParams.getAuthenticationToken.length==0){

        errorInfos.set("TOKEN:", new ResultInfo(ResponseCode.INVALID_TOKEN,"Token de autenticação obrigatório"));
    }
    return true; // incompleted function. Must thwro properly error
}

}