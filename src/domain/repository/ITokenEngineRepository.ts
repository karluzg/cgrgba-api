import { TokenSession } from "../model/TokenSession";

export interface ITokenEngineRepository{
    findByToken(token: string): Promise<TokenSession>;
    saveTokenSession(token:TokenSession): Promise <TokenSession>;
}