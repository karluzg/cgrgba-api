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
import { ITokenEngineRepository } from "../../repository/ITokenEngineRepository";
import { container } from 'tsyringe'
import { UserLoginParams } from "../../../application/model/user-manager/UserLoginParams";
import { UserLoginResult } from "../../../application/model/user-manager/UserLoginResult";
import { NotFoundExcecption } from "../../../infrestructure/exceptions/NotFoundExcecption";
import { PasswordValidator } from "../../../infrestructure/validator/managers/PasswordValidator";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { error } from "console";
import { v4 as uuidv4 } from 'uuid';


export class LoginOperation extends OperationTemplate<UserLoginResult, UserLoginParams>{

    constructor() {
        super(OperationNames.CREATE_USER)
    }


    protected async doExecute(params: UserLoginParams, result: UserLoginResult) {
        logger.info("[LoginOperation] Perform dependency injection for IUserEngineRepository")
        const userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        logger.info("[LoginOperation] Perform dependency injection for ITokenEngineRepository")
        const tokenRepository = container.resolve<ITokenEngineRepository>("ITokenEngineRepository")

        logger.info("[LoginOperation] Find User by email")
        const user = await userRepository.findUserByEmail(params.getUserEmail)


        logger.info("[LoginOperation] Find User asybn User ")
        
            logger.info("[LoginOperation] check if find user")
            if (!user.id)
                throw new NotFoundExcecption(Field.SYSTEM, MiddlewareBusinessMessage.USER_EMIAL_NOT_FOUND)

            logger.info("[LoginOperation] check user password")
            const passwordValidator = new PasswordValidator();
            if (!await passwordValidator.checkPassword(params.getuserPassword, user.passwordHash))
                throw new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.USER_INVALID_PASSWORD)



            logger.info("[LoginOperation] creating new token")
            const token = new TokenSession()
            token.token= uuidv4().toString()
            token.user = user;

            const creationDate = new Date();
            const expireDate = new Date();

            logger.info("[LoginOperation]  token expire in 24 hours")
            expireDate.setHours(creationDate.getHours() + 24);
            token.sessionCreationDate = creationDate;
            token.sessionExpireDate = expireDate;


            const newTokenSession = await tokenRepository.saveTokenSession(token)

            result.setToken = newTokenSession;
       

    }



    protected initResult(): UserLoginResult {
        return new UserLoginResult()
    }



}
