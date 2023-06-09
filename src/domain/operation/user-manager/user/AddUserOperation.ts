
import { UserParams } from "../../../../application/model/user-manager/UserParams";
import { UserResult } from "../../../../application/model/user-manager/UserResult";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../../model/TokenSession";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { User } from "../../../model/User";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { container } from 'tsyringe'
import { PasswordValidator } from "../../../../infrestructure/validator/managers/PasswordValidator";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { GeneratePassowordUtil } from "../../util/GeneratePassowordUtil";
import { EmailTemplate } from "../../../../infrestructure/template/EmailTemplate";
import { PlataformConfig } from "../../../../infrestructure/config/plataform";
import { EmailNotification } from "../../util/EmailNotification";
import { IRoleEngineRepository } from "../../../repository/IRoleEngineRepository";
import { Role } from "../../../model/Role";
import { UserResponseBuilder } from "../../response-builder/user-manager/UserResponseBuilder";
import { IMessageContentsEngineRepository } from "../../../repository/IMessageContentsEngineRepository";
import { MessageTemplateFixedIdEnum } from "../../../model/enum/MessageTemplateFixedIdEnum";



export class AddUserOperation extends UserAuthOperationTemplate<UserResult, UserParams>{

    private userRepository: IUserEngineRepository;
    private rolesRepository: IRoleEngineRepository;
    private readonly messageContsEngineRepository: IMessageContentsEngineRepository
    private roles: Role[];

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        this.rolesRepository = container.resolve<IRoleEngineRepository>("IRoleEngineRepository")
        this.messageContsEngineRepository = container.resolve<IMessageContentsEngineRepository>("IMessageContentsEngineRepository")
        this.roles = [];
    }

    protected async doValidateParameters(params: UserParams): Promise<void> {

        let user = await this.userRepository.findUserByEmail(params.getEmail)
        logger.info("[AddUserOperation] User founded by email", JSON.stringify(user))

        if (user) {
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_EMAIL_ALREADY_EXIST);
        }

        user = await this.userRepository.findUserByMobileNumber(params.getMobileNumber);

        logger.info("[AddUserOperation] User founded by mobile number", JSON.stringify(user))
        if (user) {

            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_MBILE_NUMBER_ALREADY_EXIST);
        }

        logger.info("[AddUserOperation] Start searching match Role in Data Base...");
        if (params.getRoles) {
            for (const role of params.getRoles) {
              const roleEntity = await this.rolesRepository.findRoleByName(role);
              if (!roleEntity) {

                  throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.ROLE_NOT_EXIST);
              } else {
                this.roles.push(roleEntity);
              }
            }
        }
        logger.info("[AddUserOperation] Finish of searching match Role in Data Base...");

    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: UserParams, result: UserResult): Promise<void> {


        const password = GeneratePassowordUtil.generateRandomString(8);

        logger.info("[AddUserOperation] Creatting salt and hash from password generated", password)
        const passwordValidator = new PasswordValidator();
        const salt = passwordValidator.createSalt()
        const hash = passwordValidator.generateHash(password, await salt)


        const user = new User(); // status is created automatically in user constructor - NEW
        user.email = params.getEmail;
        user.fullName = params.getFullName;
        user.mobileNumber = params.getMobileNumber;
        user.passwordHash = await hash;
        user.passwordSalt = await salt;
        user.roles = this.roles

        logger.info("[AddUserOperation] Creating user in db", JSON.stringify(user))
        const newUser: User = await this.userRepository.saveUser(user)

        const userRespponse = await UserResponseBuilder.buildUserResponse(newUser)

        result.setUser = userRespponse;

        const emailMessage = await EmailNotification.sendUserNotification(user.fullName,
            user.email,
            password,
            PlataformConfig.url.appBackOfficeUrl,
            PlataformConfig.contact.email,
            this.messageContsEngineRepository,
            MessageTemplateFixedIdEnum.CREATE_NEW_USER_SUBJECT,
            MessageTemplateFixedIdEnum.CREATE_NEW_USER_BODY, "pt-PT");

        const emailTemplate = new EmailTemplate();
        const mailOption = await emailTemplate.createMailOption(user.email, emailMessage);

        await emailTemplate.sendEmail(mailOption);

    }


    protected initResult(): UserResult {
        return new UserResult()
    }

}

