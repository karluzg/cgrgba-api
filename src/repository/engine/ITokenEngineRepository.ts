import { TokenSession } from "../../domain-model/TokenSession";

export interface ITokenEngineRepository{
    findByTokenAndValidSessionExpireDate(token: string, newDate: Date): TokenSession;

}