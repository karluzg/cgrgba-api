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
import { MiddlewareCustomErrorMessage } from "../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";


export class RegisterUserOperation extends UserAuthOperationTemplate<UserResult, UserParams>{


    constructor() {
        super(OperationNames.CREATE_USER, new OperationValidatorManager())
    }


    protected doUserAuthExecuted(tokenSession: TokenSession, params: UserParams, result: UserResult): void {
        throw new NotImplementedException(Field.SYSTEM, MiddlewareCustomErrorMessage.METHOD_NOT_IMPLEMENTED);
    }
    protected newResult(): UserResult {
        throw new NotImplementedException(Field.SYSTEM, MiddlewareCustomErrorMessage.METHOD_NOT_IMPLEMENTED);
    }









}
