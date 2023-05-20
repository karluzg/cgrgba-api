import { OperationTemplate } from "../../../../infrestructure/template/OperationTemplate";
import { UserParams } from "../../../../application/model/user-manager/UserParams";
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
import { UserStatusEnum } from "../../../model/enum/UserStatusEnum";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { GeneratePassowordUtil } from "../../util/GeneratePassowordUtil";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { EmailTemplate } from "../../../../infrestructure/template/EmailTemplate";
import { plataformConfig } from "../../../../infrestructure/config/plataform";
import { EmailUtils } from "../../util/EmailUtils";



export class AddUserOperation extends UserAuthOperationTemplate<UserResult, UserParams>{

    private userRepository: IUserEngineRepository;

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")

    }

    protected async doValidateParameters(params: UserParams): Promise<void> {

        let user = await this.userRepository.findUserByEmail(params.getEmail)

        if (user) {
            logger.error("[AddUserOperation] user already exist")
            throw new InvalidParametersException(Field.EMAIL, MiddlewareBusinessMessage.USER_INVALID_EMAIL);
        }


        user = await this.userRepository.findUserByMobileNumber(params.getMobileNumber);

        if (user) {
            logger.error("[AddUserOperation] user already exist")
            throw new InvalidParametersException(Field.EMAIL, MiddlewareBusinessMessage.USER_MBILE_NUMBER_ALREADY_EXIST);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: UserParams, result: UserResult): Promise<void> {


        const password = GeneratePassowordUtil.generateRandomString(8);

        logger.info("[AddUserOperation] Creatting salt and hash from password", password)
        const passwordValidator = new PasswordValidator();
        const salt = passwordValidator.createSalt()
        const hash = passwordValidator.generateHash(password, await salt)


        const user = new User();
        user.email = params.getEmail;
        user.fullName = params.getFullName;
        user.mobileNumber = params.getMobileNumber;
        user.passwordHash = await hash;
        user.passwordSalt = await salt;
        user.status = UserStatusEnum.NEW;

        logger.info("[AddUserOperation] creating user in db %", JSON.stringify(user))
        const newUser: User = await this.userRepository.saveUser(user)
        result.setUser = newUser;

        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.USER_ADDED_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)


        const emailMessage = EmailUtils.generateNewUserBody(user.fullName,
            user.email,
            password,
            plataformConfig.ulr,
            plataformConfig.emailContact);

        const emailTemplate= new EmailTemplate();
        const mailOption= await emailTemplate.createMailOption(user.email,emailMessage);

        await emailTemplate.sendEmail(mailOption);

    }

    protected initResult(): UserResult {
        return new UserResult()
    }

}

