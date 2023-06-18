import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { User } from "../../../model/User";
import { UserResult } from "../../../../application/model/user-manager/UserResult";
import { GetByEmailOrCodeParams } from "../../../../application/model/GetByEmailOrCodeParams";
import { UserResponseBuilder } from "../../response-builder/user-manager/UserResponseBuilder";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";



export class GetUserByEmailOperation extends UserAuthOperationTemplate<UserResult, GetByEmailOrCodeParams>{

    private userRepository: IUserEngineRepository;
    private user: User;

    constructor() {
        super(OperationNamesEnum.USER_GET_BY_EMAIL, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")

    }

    protected async doValidateParameters(params: GetByEmailOrCodeParams): Promise<void> {

        this.user = await this.userRepository.findUserByEmail(params.getValue);
        logger.info("[GetUserByEmailOperation] User founded", JSON.stringify(this.user))
        
        if (!this.user) {
     
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_NOT_EXIST);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByEmailOrCodeParams, result: UserResult): Promise<void> {

        const userRespponse = await UserResponseBuilder.buildUserResponse(this.user)
        result.setUser = userRespponse;

    }

    protected initResult(): UserResult {
        return new UserResult()
    }

}

