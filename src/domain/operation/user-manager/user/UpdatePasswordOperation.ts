import { UserResult } from "../../../../application/model/user-manager/UserResult";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../../model/TokenSession";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { User } from "../../../model/User";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { container } from 'tsyringe'
import { PasswordValidator } from "../../../../infrestructure/validator/managers/PasswordValidator";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { UpdatePasswordParams } from "../../../../application/model/user-manager/UpdatePasswordParams";
import { ITokenEngineRepository } from "../../../repository/ITokenEngineRepository";
import { UserStatusEnum } from "../../../model/enum/UserStatusEnum";
import { PlataformConfig } from "../../../../infrestructure/config/plataform";



export class UpdatePasswordOperation extends UserAuthOperationTemplate<UserResult, UpdatePasswordParams>{

    private userRepository: IUserEngineRepository;
    private tokenRepository: ITokenEngineRepository;
    private user: User;

    constructor() {
        super(OperationNamesEnum.USER_UPDATE_PASSWORD, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        this.tokenRepository = container.resolve<ITokenEngineRepository>("ITokenEngineRepository")

    }

    protected async doValidateParameters(params: UpdatePasswordParams): Promise<void> {

        let token = await this.tokenRepository.findByToken(params.getAuthenticationToken())

        this.user = token.user

        if (params.getNewPassword != params.getConfirmPassword) {
            logger.error("[UpdatePasswordOperation] passoword de confimação não é igual ao novo password")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_PASSWORD_NOT_MATCH);
        }

        if (params.getNewPassword == params.getOldPassword) {
            logger.error("[UpdatePasswordOperation] nova passoword igual a antiga")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_PASSWORD_MATCH);
        }


        logger.info("[UpdatePasswordOperation] check password for user %s", this.user)
        const passwordValidator = new PasswordValidator();
        if (!await passwordValidator.checkPassword(params.getOldPassword, this.user.passwordHash)) {
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_INVALID_CREDENTIALS)
        }

    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: UpdatePasswordParams, result: UserResult): Promise<void> {

        logger.info("[UpdatePasswordOperation] Update with new passwoerd")
        const passwordValidator = new PasswordValidator();
        const salt = await passwordValidator.createSalt()
        const hash = await passwordValidator.generateHash(params.getNewPassword, salt)

        logger.info("[UpdatePasswordOperation] updated password and change the status")
        const newUser = await this.userRepository.updateUserPassword(this.user.id, hash, salt, UserStatusEnum.ACTIVE,PlataformConfig.security.passwordTry);

        result.setUser = newUser;

        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.USER_PASSWORD_UPDATED_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): UserResult {
        return new UserResult()
    }

}

