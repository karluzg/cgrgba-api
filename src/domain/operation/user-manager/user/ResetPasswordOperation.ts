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
import { EmailNotification } from "../../util/EmailNotification";
import { MessageTemplateFixedIdEnum } from "../../../model/enum/MessageTemplateFixedIdEnum";
import { IMessageContentsEngineRepository } from "../../../repository/IMessageContentsEngineRepository";



export class ResetPasswordOperation extends OperationTemplate<ResultTemplate, ResetPasswordParams>{

    private userRepository: IUserEngineRepository;
    private readonly messageContsEngineRepository: IMessageContentsEngineRepository
    private user: User

    constructor() {
        super(OperationNamesEnum.USER_RESET_PASSWORD)
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        this.messageContsEngineRepository = container.resolve<IMessageContentsEngineRepository>("IMessageContentsEngineRepository")

    }

    protected async doValidateParameters(params: ResetPasswordParams): Promise<void> {

        this.user = await this.userRepository.findUserByEmail(params.getEmail)

        if (!this.user) {
            logger.error("[ResetPasswordOperation] User not exist")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_NOT_EXIST);
        }

        if (this.user.mobileNumber != params.getMobileNumber) {
            logger.error("[ResetPasswordOperation] Mobile number not match")
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


        const emailMessage = await EmailNotification.sendUserNotification(newUser.fullName,
            newUser.email,
            password,
            PlataformConfig.url.appBackOfficeUrl,
            PlataformConfig.contact.email,
            this.messageContsEngineRepository,
            MessageTemplateFixedIdEnum.RESET_PASSWORD_SUBJECT,
            MessageTemplateFixedIdEnum.RESET_PASSWORD_BODY, "pt-PT");
        const emailTemplate = new EmailTemplate();
        const mailOption = await emailTemplate.createMailOption(newUser.email, emailMessage);

        await emailTemplate.sendEmail(mailOption);
    }



    protected initResult(): ResultTemplate {
        return new ResultTemplate()
    }

}

