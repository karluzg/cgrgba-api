import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { User } from "../../../model/User";
import { GetByIdParams } from "../../../../application/model/GetByIdParams";
import { UserResult } from "../../../../application/model/user-manager/UserResult";
import { IUserPossibleStatusEngneRepository } from "../../../repository/IUserPossibleStatusEngineRepository";
import { UserPossibleStatus } from "../../../model/UserPossibleStatus";
import { UserBuilder } from "../../response-builder/user-manager/UserBuilder";


export class GetUserByIdOperation extends UserAuthOperationTemplate<UserResult, GetByIdParams>{

    private readonly userRepository: IUserEngineRepository;
    private readonly userPossiblestatusEngineRepository: IUserPossibleStatusEngneRepository;
    private user: User;

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        this.userPossiblestatusEngineRepository = container.resolve<IUserPossibleStatusEngneRepository>("IUserPossibleStatusEngneRepository")

    }

    protected async doValidateParameters(params: GetByIdParams): Promise<void> {

        this.user = await this.userRepository.findUserById(params.getId);
        if (!this.user) {
            logger.error("[GetUserByIdIOperation] user not exist")
            throw new NotFoundException(Field.USER, MiddlewareBusinessMessage.USER_NOT_FOUND);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByIdParams, result: UserResult): Promise<void> {

        logger.info("[GetUserByIdIOperation] get users")
        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.SUCCESS_MESSAGE));

        const possibleStatus: UserPossibleStatus[] = await this.userPossiblestatusEngineRepository.findUserNextStatus(this.user.status.code);
        const newUserResponse = await UserBuilder.buildUserResponse(this.user);
        result.setUser = newUserResponse;
        result.setPossibleStatus = possibleStatus;

    }

    protected initResult(): UserResult {
        return new UserResult()
    }

}

