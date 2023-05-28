import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { User } from "../../../model/User";
import { GetByIdParams } from "../../../../application/model/GetByIdParams";
import { UserResult } from "../../../../application/model/user-manager/UserResult";


export class GetUserByIdOperation extends UserAuthOperationTemplate<UserResult, GetByIdParams>{

    private userRepository: IUserEngineRepository;
    private user: User;

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")

    }

    protected async doValidateParameters(params: GetByIdParams): Promise<void> {

        this.user = await this.userRepository.findUserById(params.getId);
        if (!this.user) {
            logger.error("[GetUserByIdIOperation] user not exist")
            throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByIdParams, result: UserResult): Promise<void> {

        logger.info("[GetUserByIdIOperation] get users")
        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.USER_GET_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

        result.setUser = this.user;

    }

    protected initResult(): UserResult {
        return new UserResult()
    }

}

