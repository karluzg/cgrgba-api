import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { User } from "../../../model/User";
import { UserResult } from "../../../../application/model/user-manager/UserResult";
import { GetByEmailOrCodeParams } from "../../../../application/model/GetByEmailOrCodeParams";



export class GetUserByEmailOperation extends UserAuthOperationTemplate<UserResult, GetByEmailOrCodeParams>{

    private userRepository: IUserEngineRepository;
    private user: User;

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")

    }

    protected async doValidateParameters(params: GetByEmailOrCodeParams): Promise<void> {

        this.user = await this.userRepository.findUserByEmail(params.getValue);
        if (!this.user) {
            logger.error("[GetUserByEmailOperation] user not exist")
            throw new NotFoundException(Field.USER, MiddlewareBusinessMessage.USER_NOT_FOUND);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByEmailOrCodeParams, result: UserResult): Promise<void> {

        logger.info("[GetUserByEmailOperation] get users")
    
        result.setUser = this.user;

    }

    protected initResult(): UserResult {
        return new UserResult()
    }

}

