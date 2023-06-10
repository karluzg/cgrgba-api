
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
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { EmailTemplate } from "../../../../infrestructure/template/EmailTemplate";
import { PlataformConfig } from "../../../../infrestructure/config/plataform";
import { EmailUtils } from "../../util/EmailUtils";
import { IRoleEngineRepository } from "../../../repository/IRoleEngineRepository";
import { Role } from "../../../model/Role";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { SchedulingUtil } from "../../util/SchedulingUtil";
import { UserResponseBuilder } from "../../response-builder/user-manager/UserResponseBuilder";



export class AddUserOperation extends UserAuthOperationTemplate<UserResult, UserParams>{

    private userRepository: IUserEngineRepository;
    private rolesRepository: IRoleEngineRepository;
    private roles: Role[];

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        this.rolesRepository = container.resolve<IRoleEngineRepository>("IRoleEngineRepository")
        this.roles = [];
    }

    protected async doValidateParameters(params: UserParams): Promise<void> {

        let user = await this.userRepository.findUserByEmail(params.getEmail)

        if (user) {
            logger.error("[AddUserOperation] user already exist")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_EMAIL_ALREADY_EXIST);
        }


        user = await this.userRepository.findUserByMobileNumber(params.getMobileNumber);

        if (user) {
            logger.error("[AddUserOperation] user already exist")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_MBILE_NUMBER_ALREADY_EXIST);
        }

        if (params.getRoles) {
            for (const role of params.getRoles) {
              const roleEntity = await this.rolesRepository.findRoleByName(role);
              if (!roleEntity) {
                logger.error("[AddUserOperation] Role not found");
                throw new NotFoundException(Field.USER, MiddlewareBusinessMessage.ROLE_NOT_FOUND);
              } else {
                this.roles.push(roleEntity);
              }
            }
          }

    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: UserParams, result: UserResult): Promise<void> {


        const password = GeneratePassowordUtil.generateRandomString(8);

        logger.info("[AddUserOperation] Creatting salt and hash from password", password)
        const passwordValidator = new PasswordValidator();
        const salt = passwordValidator.createSalt()
        const hash = passwordValidator.generateHash(password, await salt)


        const user = new User(); // status is created automatically in user constructor
        user.email = params.getEmail;
        user.fullName = params.getFullName;
        user.mobileNumber = params.getMobileNumber;
        user.passwordHash = await hash;
        user.passwordSalt = await salt;
        user.roles = this.roles


        logger.info("[AddUserOperation] creating user in db %", JSON.stringify(user))
        const newUser: User = await this.userRepository.saveUser(user)

        const userRespponse = await UserResponseBuilder.buildUserResponse(newUser)

        result.setUser = userRespponse;

        const emailMessage = EmailUtils.generateNewUserBody(user.fullName,
            user.email,
            password,
            PlataformConfig.url.backOffice,
            PlataformConfig.contact.email);

        const emailTemplate = new EmailTemplate();
        const mailOption = await emailTemplate.createMailOption(user.email, emailMessage);

        await emailTemplate.sendEmail(mailOption);

    }


    protected initResult(): UserResult {
        return new UserResult()
    }

}

