import { OperationTemplate } from "../../../infrestructure/template/OperationTemplate";
import { UserParams } from "../../../application/model/user-manager/UserParams";
import { UserResult } from "../../../application/model/user-manager/UserResult";
import { OperationNames } from "../OperationNames";
import logger from "../../../infrestructure/config/logger";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../model/TokenSession";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { User } from "../../model/User";
import { IUserEngineRepository } from "../../repository/IUserEngineRepository";
import { container } from 'tsyringe'
import { PasswordValidator } from "../../../infrestructure/validator/managers/PasswordValidator";
import { UserStatusEnum } from "../../model/enum/UserStatus";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";


export class AddUserOperation extends UserAuthOperationTemplate<UserResult, UserParams>{



    constructor() {
        super(OperationNames.CREATE_USER, new OperationValidatorManager())
    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: UserParams, result: UserResult): Promise<void> {

        logger.info("[AddUserOperation] Perform dependency injection for IUserEngineRepository")
        const userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        
        logger.info("[AddUserOperation] emial verfication")
        const existUser= await userRepository.findUserByEmail(params.getUserEmail)
        if(existUser)
        throw new InvalidParametersException(Field.SYSTEM,MiddlewareBusinessMessage.USER_INVALID_EMAIL);
        
        
        logger.info("[AddUserOperation] Creatting randomPAssword")
        const password = this.generateRandomString(8);

        logger.info("[AddUserOperation] Creatting salt and hash from password")
        const passwordValidator = new PasswordValidator();
        const salt = passwordValidator.createSalt()
        const hash = passwordValidator.generateHash(password, await salt)
        //add new user
        const user = new User();
        user.userEmail = params.getUserEmail;
        user.userFullName = params.getUserFullName;
        user.userMobileNumber = params.getUserMobileNumber;
        user.userCreationDate = new Date
        user.passwordHash = await hash;
        user.passwordSalt = await salt;
        user.userStatus = UserStatusEnum.NEW;

        logger.info("[AddUserOperation] creating user in db")
        const newUser: User = await userRepository.saveUser(user)

        result.setUser = newUser;



    }
    protected initResult(): UserResult {
        return new UserResult()
    }


    generateRandomString(length: number): string {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }









}
