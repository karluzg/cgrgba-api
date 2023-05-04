import { TokenSession } from "../model/TokenSession";

export interface ITokenEngineRepository{
    findByTokenAndValidSessionExpireDate(token: string, newDate: Date): Promise<TokenSession> ;
    saveTokenSession(token:TokenSession): Promise <TokenSession>;
}