import { Request } from "express";
import logger from "../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { UnauthorizedOperationException } from "../../../infrestructure/exceptions/UnauthorizedOperationException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";


export class AuthValidator{

    public static checkAuthorizationToken(request: Request): string {
        logger.info("[AuthValidator] checking authorization token")
        if (!request.headers.authorization) {
            throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_TOKEN_NOT_FOUND);
        } else {
            const authHeader = request.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            if (token == null) {
                throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_INVALID_TOKEN);
            }
            return token;

        }
    }
}