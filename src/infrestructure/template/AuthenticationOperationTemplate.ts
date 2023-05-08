import { ResultTemplate } from "../template/ResultTemplate";
import { IAuthParams } from "../interface/IAuthParams";
import { OperationTemplate } from "../template/OperationTemplate";
import { ITokenEngineRepository } from "../../domain/repository/ITokenEngineRepository";
import logger from "../../infrestructure/config/logger";
import { UnauthorizedOperationException } from "../exceptions/UnauthorizedOperationException";
import { container } from 'tsyringe'
import { TokenSession } from "../../domain/model/TokenSession";
import { MiddlewareBusinessMessage } from "../response/enum/MiddlewareCustomErrorMessage";
import { Field } from "../exceptions/enum/Field";
import { UserStatusEnum } from "../../domain/model/enum/UserStatusEnum";
import { ForbiddenOperationException } from "../exceptions/ForbiddenOperationException";

export abstract class AuthenticationOperationTemplate<R extends ResultTemplate, P extends IAuthParams> extends OperationTemplate<R, P>{


    protected abstract doAuthExecute(tokenSession: TokenSession, params: P, result: R): Promise<void>

    constructor(operationId: number) {
        super(operationId)


    }


    protected async doExecute(params: P, result: R) {


        logger.info("[AuthenticationOperationTemplate] Perform dependency injection for ITokenEngineRepository")
        const tokenRepository = container.resolve<ITokenEngineRepository>("ITokenEngineRepository")


        logger.info("[AuthenticationOperationTemplate] - Begin searching for valid token");


        const tokenSessionFound = await tokenRepository.findByToken(params.getAuthenticationToken())

        if (!tokenSessionFound) {
            logger.error("valid token was not found")
            throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_INVALID_TOKEN);

        }

        logger.info("[AuthenticationOperationTemplate] - Valid token was founded for user %s", tokenSessionFound.user.userEmail);

        logger.info("[AuthenticationOperationTemplate] - Check if user has initial actions");
        const user = tokenSessionFound.user;

        if (user.userStatus == UserStatusEnum.NEW) {
            logger.error("User has unexptected initial action")
            throw new ForbiddenOperationException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_UNEXPECTED_UNEXECUTED_INITIAL_ACTION)
        }
        if (user.userStatus != UserStatusEnum.ACTIVE) {
            logger.error("Useris not active")
            throw new ForbiddenOperationException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_OPERTATION_NOT_ALLOWED)
        }


      await  this.doAuthExecute(tokenSessionFound, params, result)

    }


 

}