import { Result } from "../../engine-interface/Result";
import { AuthParams } from "../../engine-interface/AuthParams";
import { OperationTemplate } from "./OperationTemplate";
import { IInitialActionEngineRespository } from "../../repository/engine/IInitialActionEngineRepository";
import { ITokenEngineRepository } from "../../repository/engine/ITokenEngineRepository";
import logger from "../../common/config/logger";
import { UnauthorizedOperationException } from "../../common/exceptions/UnauthorizedOperationException";
import { container } from 'tsyringe'
import { InitialActionTypeEnum } from "../../domain-model/enum/InitialActionType";
import { TokenSession } from "../../domain-model/TokenSession";
import { ForbiddenOperationException } from "../../common/exceptions/ForbiddenOperationException";
import { MiddlewareCustomErrorMessage } from "../../common/response/MiddlewareCustomErrorMessage";
import { Field } from "../../common/exceptions/Field";

export abstract class AuthenticationOperationTemplate<R extends Result, P extends AuthParams> extends OperationTemplate<R, P>{

    protected initialActionRepository: IInitialActionEngineRespository

    public setInitialActionRepository(initialActionRepository: IInitialActionEngineRespository) {
        this.initialActionRepository = initialActionRepository;
    }

    constructor(operationId: number) {
        super(operationId)


    }

    protected getPermittedTypes(): InitialActionTypeEnum[] {
        return new Array<InitialActionTypeEnum>();
    }

    protected doExecute(params: P, result: R) {


        logger.info("[AuthenticationOperationTemplate] Perform dependency injection for ITokenEngineRepository")
        const tokenRepository = container.resolve<ITokenEngineRepository>("ITokenEngineRepository")

        logger.info("[AuthenticationOperationTemplate] Perform dependency injection for IInitialActionEngineRespository")

        const initiaActionEngineRepository = container.resolve<IInitialActionEngineRespository>("IInitialActionEngineRespository")

        logger.info("[AuthenticationOperationTemplate] - Begin searching for valid token");


        const tokenSessionFound = tokenRepository.findByTokenAndValidSessionExpireDate(params.getAuthenticationToken(), new Date)

        logger.error("result of token searched:" + JSON.stringify(tokenSessionFound))

        if (tokenSessionFound && Object.keys(tokenSessionFound).length == 0) {
            logger.error("valid token was not found")
            throw new UnauthorizedOperationException(Field.SYSTEM, MiddlewareCustomErrorMessage.INVALID_TOKEN);

        }

        logger.info("[AuthenticationOperationTemplate] - Valid token was founded for user %s", tokenSessionFound.user.UserFullName);

        logger.info("[AuthenticationOperationTemplate] - Begin searching initial actions");

        const userId = tokenSessionFound.user.id;

        const initialActions = initiaActionEngineRepository.findByUserAndExecutedDateIsNull(userId)

        initialActions.filter((initialAction) => {


            if (!this.getPermittedTypes().includes(initialAction.initialActionType)) {
                logger.error("Unspected unexecuted initial action")
                throw new ForbiddenOperationException(Field.SYSTEM,
                    MiddlewareCustomErrorMessage.UNEXPECTED_UNEXECUTED_INITIAL_ACTION);
            }

        });

        this.doAuthExecute(tokenSessionFound, params, result)

    }


    protected abstract doAuthExecute(tokenSession: TokenSession, params: P, result: R)

}