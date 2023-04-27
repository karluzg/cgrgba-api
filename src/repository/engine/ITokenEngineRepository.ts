import { TokenSession } from "../../domain-model/session/TokenSession";

export interface ITokenEngineRepository{
    findByTokenAndValidSessionExpireDate(token:string, newDate:Date): Promise<TokenSession| null>

}