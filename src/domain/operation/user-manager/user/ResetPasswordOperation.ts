import { OperationTemplate } from "../../../../infrestructure/template/OperationTemplate";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { User } from "../../../model/User";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { container } from 'tsyringe'
import { PasswordValidator } from "../../../../infrestructure/validator/managers/PasswordValidator";
import { UserStatusEnum } from "../../../model/enum/UserStatusEnum";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { GeneratePassowordUtil } from "../../util/GeneratePassowordUtil";
import { EmailTemplate } from "../../../../infrestructure/template/EmailTemplate";
import { PlataformConfig } from "../../../../infrestructure/config/plataform";
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";
import { ResetPasswordParams } from "../../../../application/model/user-manager/ResetPasswordParams";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { EmailUtils } from "../../util/EmailUtils";



export class ResetPasswordOperation extends OperationTemplate<ResultTemplate, ResetPasswordParams>{

    private userRepository: IUserEngineRepository;
    private user: User

    constructor() {
        super(OperationNamesEnum.USER_CREATE)
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")

    }

    protected async doValidateParameters(params: ResetPasswordParams): Promise<void> {

        this.user = await this.userRepository.findUserByEmail(params.getEmail)

        if (!this.user) {
            logger.error("[ResetPasswordOperation] user not exist")
            throw new NotFoundException(Field.USER, MiddlewareBusinessMessage.USER_NOT_FOUND);
        }

        if (this.user.mobileNumber != params.getMobileNumber) {
            logger.error("[ResetPasswordOperation] mobile number not match")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_INVALID_CREDENTIALS);
        }
    }

    protected async doExecute(params: ResetPasswordParams, result: ResultTemplate): Promise<void> {
        const password = GeneratePassowordUtil.generateRandomString(8);

        logger.info("[ResetPasswordOperation] Creatting salt and hash from password", password)
        const passwordValidator = new PasswordValidator();
        const salt = await passwordValidator.createSalt()
        const hash = await passwordValidator.generateHash(password, salt)

        logger.info("[ResetPasswordOperation] updated password and change the status")
        const newUser = await this.userRepository.updateUserPassword(this.user.id, hash, salt, UserStatusEnum.NEW, PlataformConfig.security.passwordTry);


        const emailMessage = EmailUtils.generateResetPasswordBody(newUser.fullName, newUser.email, password, PlataformConfig.url.backOffice, PlataformConfig.contact.email);
        const emailTemplate = new EmailTemplate();
        const mailOption = await emailTemplate.createMailOption(newUser.email, emailMessage);

        await emailTemplate.sendEmail(mailOption);
    }



    protected initResult(): ResultTemplate {
        return new ResultTemplate()
    }

}

