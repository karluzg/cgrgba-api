import { Result } from "../../engine-interface/Result";
import { AuthParams } from "../../engine-interface/AuthParams";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import { OperationValidatorManager } from "../managers/OperationValidatorManager";
import { TokenSession } from "../../domain-model/TokenSession";
import { AuthenticationOperationTemplate } from "./AuthenticationOperationTemplate";
import logger from "../../common/config/logger";
import { Field } from "../../common/exceptions/Field";
import { ErrorExceptionClass } from "../../common/exceptions/ErrorExceptionClass";
import { MiddlewareCustomErrorMessage } from "../../common/response/MiddlewareCustomErrorMessage";


export abstract class UserAuthOperationTemplate<R extends Result, P extends AuthParams> extends AuthenticationOperationTemplate<R, P>{


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
            throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareCustomErrorMessage.OPERTATION_NOT_ALLOWED)
        }

            this.doUserAuthExecuted(tokenSession, params, result)

    }

    protected abstract doUserAuthExecuted(tokenSession: TokenSession, params: P, result: R): void;


}




