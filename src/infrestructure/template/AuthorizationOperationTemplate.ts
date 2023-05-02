import logger from "../../infrestructure/config/logger";
import { NotFoundExcecption } from "../../infrestructure/exceptions/NotFoundExcecption"
import { UnauthorizedOperationException } from "../../infrestructure/exceptions/UnauthorizedOperationException"
import { Field } from "../../infrestructure/exceptions/enum/Field"
import { MiddlewareCustomErrorMessage } from "../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { Request } from "express";


export abstract class AuthorizationOperationTemplate {

    static checkAuthorizationToken(request: Request): string {
        logger.info("[AuthorizationOperationTemplate] checking authorization token")
        if (!request.headers.authorization) {
            throw new NotFoundExcecption(Field.SYSTEM, MiddlewareCustomErrorMessage.TOKEN_NOT_FOUND);
        } else {
            const authHeader = request.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            if (token == null) {
                throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareCustomErrorMessage.INVALID_TOKEN);
            }
            return token;

        }
    }
}