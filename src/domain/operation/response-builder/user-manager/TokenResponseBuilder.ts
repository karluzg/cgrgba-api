import { TokenSession } from "../../../model/TokenSession";

export class TokenResponseBuilder{

    public static async buildTokenResponse(token: TokenSession): Promise<TokenSession> {
       delete token.user.enumOperationTemplate
        delete token.user.passwordHash
        delete token.user.passwordSalt
        delete token.user.passwordTry
        delete token.user.passwordSalt
     

        return token;
    }
}

