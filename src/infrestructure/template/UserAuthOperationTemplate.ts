import { ResultTemplate } from "../template/ResultTemplate";
import { IAuthParams } from "../interface/IAuthParams";
import { UnauthorizedOperationException } from "../exceptions/UnauthorizedOperationException";
import { OperationValidatorManager } from "../validator/managers/OperationValidatorManager";
import { TokenSession } from "../../domain/model/TokenSession";
import { AuthenticationOperationTemplate } from "./AuthenticationOperationTemplate";
import logger from "../../infrestructure/config/logger";
import { Field } from "../exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../response/enum/MiddlewareCustomMessage";



export abstract class UserAuthOperationTemplate<R extends ResultTemplate, P extends IAuthParams> extends AuthenticationOperationTemplate<R, P>{


    private operationValidatorManager: OperationValidatorManager
    protected abstract doUserAuthExecuted(tokenSession: TokenSession, params: P, result: R): Promise<void>;


    constructor(operationId: number, operationValidatorManager: OperationValidatorManager) {
        super(operationId)
        this.operationValidatorManager = operationValidatorManager
    }


    protected async doAuthExecute(tokenSession: TokenSession, params: P, result: R) {


        logger.info("Validate if user has permission to execute the operation")
        const isOperationAllowed = await this.operationValidatorManager.isOperationAllowed(tokenSession, this);

        if (!isOperationAllowed) {
            logger.error("[UserAuthOperationTemplate] user does not have permission to execute this operation")
            throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_OPERTATION_NOT_ALLOWED)
        }

        logger.info("Validate token date")
        const now = new Date();
        if(now>tokenSession.expireDate){
            logger.error("[UserAuthOperationTemplate] token is expirated")
            throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_INVALID_TOKEN)
        }
        


        await this.doUserAuthExecuted(tokenSession, params, result)

    }




}




