import { OperationTemplate } from "../../../../infrestructure/template/OperationTemplate";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { TokenSession } from "../../../model/TokenSession";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { User } from "../../../model/User";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { ITokenEngineRepository } from "../../../repository/ITokenEngineRepository";
import { container } from 'tsyringe'
import { UserLoginParams } from "../../../../application/model/user-manager/UserLoginParams";
import { UserLoginResult } from "../../../../application/model/user-manager/UserLoginResult";
import { PasswordValidator } from "../../../../infrestructure/validator/managers/PasswordValidator";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { v4 as uuidv4 } from 'uuid';
import { ForbiddenOperationException } from "../../../../infrestructure/exceptions/ForbiddenOperationException";
import { PlataformConfig } from "../../../../infrestructure/config/plataform";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { TokenResponseBuilder } from "../../response-builder/user-manager/TokenResponseBuilder";
import { IUserPossibleStatusEngneRepository } from "../../../repository/IUserPossibleStatusEngineRepository";
import { UserPossibleStatus } from "../../../model/UserPossibleStatus";


export class LoginOperation extends OperationTemplate<UserLoginResult, UserLoginParams>{

    private userRepository: IUserEngineRepository;
    private tokenRepository: ITokenEngineRepository;
    private userPossiblestatusRepository: IUserPossibleStatusEngneRepository;
    private user: User;

    constructor() {
        super(OperationNamesEnum.SESSION_LOGIN)
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        this.tokenRepository = container.resolve<ITokenEngineRepository>("ITokenEngineRepository")
        this.userPossiblestatusRepository = container.resolve<IUserPossibleStatusEngneRepository>("IUserPossibleStatusEngneRepository")
    }

    protected async doValidateParameters(params: UserLoginParams): Promise<void> {

        this.user = await this.userRepository.findUserByEmail(params.getEmail)
     
        if (!this.user) {
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_INVALID_CREDENTIALS);
        }

        if (this.user.passwordTry <= 0) {
            throw new ForbiddenOperationException(Field.USER, MiddlewareBusinessMessage.USER_PASSWORD_LOCKED);
        }

        logger.info("[LoginOperation] Check password for user", JSON.stringify(this.user))
        const passwordValidator = new PasswordValidator();
        if (!await passwordValidator.checkPassword(params.getPassword, this.user.passwordHash)) {
            this.user.passwordTry = this.user.passwordTry - 1
            await this.userRepository.saveUser(this.user)

            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_INVALID_CREDENTIALS)
        }

    }

    protected async doExecute(params: UserLoginParams, result: UserLoginResult) {


        let newTokenSession = await this.buildTokenSession()

        const newTokenResponse = await TokenResponseBuilder.buildTokenResponse(newTokenSession)

        const nextPossibleStatus: UserPossibleStatus[] = await this.userPossiblestatusRepository
            .findUserNextStatus(newTokenSession.user.status.code);

        result.setToken = newTokenResponse;
        result.setnextPossibleStatus = nextPossibleStatus

        this.user.passwordTry = PlataformConfig.security.passwordTry
        await this.userRepository.saveUser(this.user)

    }

    private async buildTokenSession(): Promise<TokenSession> {
        const newTokenSession = new TokenSession()
        newTokenSession.token = uuidv4().toString()
        newTokenSession.user = this.user;

        const creationDate = new Date();
        const expireDate = new Date();

        expireDate.setHours(creationDate.getHours() + 24);
        newTokenSession.expireDate = expireDate;
        newTokenSession.expireDateInMilliseconds = expireDate.getTime();

        await this.saveTokenSession(newTokenSession);

        return newTokenSession
    }

    private async saveTokenSession(newTokenSession: TokenSession): Promise<void> {

        logger.info("[LoginOperation]  Saving token session...")
        await this.tokenRepository.saveTokenSession(newTokenSession)
    }

    protected initResult(): UserLoginResult {
        return new UserLoginResult()
    }



}
