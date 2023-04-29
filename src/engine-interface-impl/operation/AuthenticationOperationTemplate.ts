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
import { UnsuccessfullOperationException } from "../../common/exceptions/UnsuccessfullOperationException";
import { MiddlewareCustomErrorMessage } from "../../common/response/CustomErrorMessage";

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

        try {
            logger.info("[AuthenticationOperationTemplate] Perform dependency injection for ITokenEngineRepository")
            const tokenRepository = container.resolve<ITokenEngineRepository>("ITokenEngineRepository")
            logger.info("[AuthenticationOperationTemplate] Perform dependency injection successfully for ITokenRepository ")

            logger.info("[AuthenticationOperationTemplate] Perform dependency injection for IInitialActionEngineRespository")

            const initiaActionEngineRepository = container.resolve<IInitialActionEngineRespository>("IInitialActionEngineRespository")

            logger.info("[AuthenticationOperationTemplate] Perform dependency injection for IInitialActionEngineRespository was successfully")

            logger.info("[AFTER ASYNC CALL] - Begin searching for valid token")

            tokenRepository.findByTokenAndValidSessionExpireDate(params.getAuthenticationToken(), new Date)
                .then((tokenSessionFounded) => {

                    /*  if (tokenSessionFounded == null) {
                          logger.error("Does not exist a valid token")
                          throw new UnauthorizedOperationException(MiddlewareCustomErrorMessage.OPERTATION_NOT_ALLOWED)
                      }*/

                    logger.info("token was founded for user %s", tokenSessionFounded.user.UserEmail)

                    const userId = tokenSessionFounded.user.id;

                    initiaActionEngineRepository.findByUserAndExecutedDateIsNull(userId).then((initialActions) => {
                        initialActions.filter((initialAction) => {

                            if (!this.getPermittedTypes().includes(initialAction.initialActionType)) {
                                logger.error("Unspected unexecuted initial action")
                                throw new ForbiddenOperationException(MiddlewareCustomErrorMessage.UNEXPECTED_UNEXECUTED_INITIAL_ACTION);
                            }

                        });

                        this.doAuthExecute(tokenSessionFounded, params, result)

                    }).catch((error) => {
                        logger.error("Error while searching for user's initial action for operationID %s", this.operationId);
                        throw new UnsuccessfullOperationException(MiddlewareCustomErrorMessage.ERROR_WHILE_SEARCHING_USER_INITIAL_ACTION + error);

                    })

                }).catch((error) => {
                    logger.error("Error while searching for user's initial action for operationID %s", this.operationId);
                    throw new UnsuccessfullOperationException(MiddlewareCustomErrorMessage.ERROR_WHILE_SEARCHING_USER_INITIAL_ACTION + error);
                })
        } catch (error) {
            throw new UnsuccessfullOperationException(MiddlewareCustomErrorMessage.INTERNAL_SERVER_ERROR + error)
        }
    }

    protected abstract doAuthExecute(tokenSession: TokenSession, params: P, result: R)

}