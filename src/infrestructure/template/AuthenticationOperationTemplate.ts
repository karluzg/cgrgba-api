import { ResultTemplate } from "../template/ResultTemplate";
import { IAuthParams } from "../interface/IAuthParams";
import { OperationTemplate } from "../template/OperationTemplate";
import { IInitialActionEngineRespository } from "../../domain/repository/IInitialActionEngineRepository";
import { ITokenEngineRepository } from "../../domain/repository/ITokenEngineRepository";
import logger from "../../infrestructure/config/logger";
import { UnauthorizedOperationException } from "../exceptions/UnauthorizedOperationException";
import { container } from 'tsyringe'
import { InitialActionTypeEnum } from "../../domain/model/enum/InitialActionType";
import { TokenSession } from "../../domain/model/TokenSession";
import { ForbiddenOperationException } from "../exceptions/ForbiddenOperationException";
import { MiddlewareBusinessMessage } from "../response/enum/MiddlewareCustomErrorMessage";
import { Field } from "../exceptions/enum/Field";
import { promises } from "dns";

export abstract class AuthenticationOperationTemplate<R extends ResultTemplate, P extends IAuthParams> extends OperationTemplate<R, P>{

    protected initialActionRepository: IInitialActionEngineRespository
    protected abstract doAuthExecute(tokenSession: TokenSession, params: P, result: R): Promise<void>


    public setInitialActionRepository(initialActionRepository: IInitialActionEngineRespository) {
        this.initialActionRepository = initialActionRepository;
    }

    constructor(operationId: number) {
        super(operationId)


    }

    protected getPermittedTypes(): InitialActionTypeEnum[] {
        return new Array<InitialActionTypeEnum>();
    }

    protected async doExecute(params: P, result: R) {


        logger.info("[AuthenticationOperationTemplate] Perform dependency injection for ITokenEngineRepository")
        const tokenRepository = container.resolve<ITokenEngineRepository>("ITokenEngineRepository")

        logger.info("[AuthenticationOperationTemplate] Perform dependency injection for IInitialActionEngineRespository")

        const initiaActionEngineRepository = container.resolve<IInitialActionEngineRespository>("IInitialActionEngineRespository")

        logger.info("[AuthenticationOperationTemplate] - Begin searching for valid token");


        const tokenSessionFound = await tokenRepository.findByTokenAndValidSessionExpireDate(params.getAuthenticationToken(), new Date)

        logger.error("result of token searched:" + tokenSessionFound.token);

        if (!tokenSessionFound) {
            logger.error("valid token was not found")
            throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareBusinessMessage.INVALID_TOKEN);

        }

        logger.info("[AuthenticationOperationTemplate] - Valid token was founded for user %s", tokenSessionFound.user.userFullName);

        logger.info("[AuthenticationOperationTemplate] - Begin searching initial actions");

        const userId = tokenSessionFound.user.id;

        const initialActions = await initiaActionEngineRepository.findByUserAndExecutedDateIsNull(userId)

        initialActions.filter((initialAction) => {


            if (!this.getPermittedTypes().includes(initialAction.initialActionType)) {
                logger.error("Unspected unexecuted initial action")
                throw new ForbiddenOperationException(Field.SYSTEM,
                    MiddlewareBusinessMessage.UNEXPECTED_UNEXECUTED_INITIAL_ACTION);
            }

        });

      await  this.doAuthExecute(tokenSessionFound, params, result)

    }


 

}