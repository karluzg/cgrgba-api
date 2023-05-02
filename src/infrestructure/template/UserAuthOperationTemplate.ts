import { ResultTemplate } from "../template/ResultTemplate";
import { IAuthParams } from "../interface/IAuthParams";
import { UnauthorizedOperationException } from "../exceptions/UnauthorizedOperationException";
import { OperationValidatorManager } from "../validator/managers/OperationValidatorManager";
import { TokenSession } from "../../domain/model/TokenSession";
import { AuthenticationOperationTemplate } from "./AuthenticationOperationTemplate";
import logger from "../../infrestructure/config/logger";
import { Field } from "../exceptions/enum/Field";
import { ErrorExceptionClass } from "../exceptions/ErrorExceptionClass";
import { MiddlewareBusinessMessage } from "../response/enum/MiddlewareCustomErrorMessage";


export abstract class UserAuthOperationTemplate<R extends ResultTemplate, P extends IAuthParams> extends AuthenticationOperationTemplate<R, P>{


    private operationValidatorManager: OperationValidatorManager


    constructor(operationId: number, operationValidatorManager: OperationValidatorManager) {
        super(operationId)
        this.operationValidatorManager = operationValidatorManager
    }


    protected doAuthExecute(tokenSession: TokenSession, params: P, result: R) {


        logger.info("Validate if user has permission to execute the operation")
        const isOperationAllowed = this.operationValidatorManager.isOperationAllowed(tokenSession, this);

        if (!isOperationAllowed) {
            logger.error("[UserAuthOperationTemplate] user does not have permission to execute this operation")
            throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareBusinessMessage.OPERTATION_NOT_ALLOWED)
        }

            this.doUserAuthExecuted(tokenSession, params, result)

    }

    protected abstract doUserAuthExecuted(tokenSession: TokenSession, params: P, result: R): void;


}




