import { OperationTemplate } from "../../../../infrestructure/template/OperationTemplate";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { TokenSession } from "../../../model/TokenSession";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { User } from "../../../model/User";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { ITokenEngineRepository } from "../../../repository/ITokenEngineRepository";
import { container } from 'tsyringe'
import { UserLoginParams } from "../../../../application/model/user-manager/UserLoginParams";
import { UserLoginResult } from "../../../../application/model/user-manager/UserLoginResult";
import { PasswordValidator } from "../../../../infrestructure/validator/managers/PasswordValidator";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { v4 as uuidv4 } from 'uuid';
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { ForbiddenOperationException } from "../../../../infrestructure/exceptions/ForbiddenOperationException";
import { PlataformConfig } from "../../../../infrestructure/config/plataform";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";


export class LoginOperation extends OperationTemplate<UserLoginResult, UserLoginParams>{

    private userRepository: IUserEngineRepository;
    private tokenRepository: ITokenEngineRepository;
    private user: User;

    constructor() {
        super(OperationNamesEnum.SESSION_LOGIN)
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        this.tokenRepository = container.resolve<ITokenEngineRepository>("ITokenEngineRepository")
    }

    protected async doValidateParameters(params: UserLoginParams): Promise<void> {

        this.user = await this.userRepository.findUserByEmail(params.getEmail)
        if (this.user.passwordTry <= 0) {
            throw new ForbiddenOperationException(Field.SYSTEM, MiddlewareBusinessMessage.USER_PASSWORD_LOCKED);
        }

        if (!this.user) {
            throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR);
        }


        logger.info("[LoginOperation] check password for user %s", this.user)
        const passwordValidator = new PasswordValidator();
        if (!await passwordValidator.checkPassword(params.getPassword, this.user.passwordHash)) {
            this.user.passwordTry = this.user.passwordTry - 1
            await this.userRepository.saveUser(this.user)

            throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.USER_INVALID_CREDENTIALS)
        }

    }

    protected async doExecute(params: UserLoginParams, result: UserLoginResult) {


        const token = new TokenSession()
        token.token = uuidv4().toString()
        token.user = this.user;

        const creationDate = new Date();
        const expireDate = new Date();

        expireDate.setHours(creationDate.getHours() + 24);
        token.expireDate = expireDate;


        logger.info("[LoginOperation]  token expire in 24 hours %s", JSON.stringify(token.user.email))
        const newTokenSession = await this.tokenRepository.saveTokenSession(token)

        result.setToken = newTokenSession;

        this.user.passwordTry = PlataformConfig.passwordTry
        await this.userRepository.saveUser(this.user)


        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SESSION_LOGIN_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)
    }

    protected initResult(): UserLoginResult {
        return new UserLoginResult()
    }



}
