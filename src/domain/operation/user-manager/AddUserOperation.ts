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


export class AddUserOperation extends UserAuthOperationTemplate<UserResult, UserParams>{



    constructor() {
        super(OperationNames.CREATE_USER, new OperationValidatorManager())
    }


    protected doUserAuthExecuted(tokenSession: TokenSession, params: UserParams, result: UserResult): void {

        logger.info("[AuthenticationOperationTemplate] Perform dependency injection for IUserEngineRepository")
        const userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
    //add new user
    const user = new User();
    user.UserEmail= params.getUserEmail;
    user.UserFullName= params.getUserEmail;
    user.UserMobileNumber= params.getUserMobileNumber;

    const newUser= userRepository.saveUser(user)

   // result.setUser(newUser);

    }
    protected initResult(): UserResult {
        return new UserResult()
    }









}
