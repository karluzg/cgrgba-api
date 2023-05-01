import { OperationTemplate } from "../../OperationTemplate";
import { RegisterUserParams } from "../../../../engine-interface/params/user/RegisterUserParams";
import { RegisterUserResult } from "../../../../engine-interface/result/user/RegisterUserResult";
import { OperationNames } from "../../OperationNames";
import logger from "../../../../common/config/logger";
import { UserAuthOperationTemplate } from "../../UserAuthOperationTemplate";
import { TokenSession } from "../../../../domain-model/TokenSession";
import { OperationValidatorManager } from "../../../managers/OperationValidatorManager";
import { NotImplementedException } from "../../../../common/exceptions/NotImplementedException";
import { Field } from "../../../../common/exceptions/Field";
import { MiddlewareCustomErrorMessage } from "../../../../common/response/MiddlewareCustomErrorMessage";


export class RegisterUserOperation extends UserAuthOperationTemplate<RegisterUserResult, RegisterUserParams>{


    constructor() {
        super(OperationNames.CREATE_USER, new OperationValidatorManager())
    }


    protected doUserAuthExecuted(tokenSession: TokenSession, params: RegisterUserParams, result: RegisterUserResult): void {
        throw new NotImplementedException(Field.SYSTEM, MiddlewareCustomErrorMessage.METHOD_NOT_IMPLEMENTED);
    }
    protected newResult(): RegisterUserResult {
        throw new NotImplementedException(Field.SYSTEM, MiddlewareCustomErrorMessage.METHOD_NOT_IMPLEMENTED);
    }









}
