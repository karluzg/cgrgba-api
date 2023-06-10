import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { PageAndSizeParams } from "../../../../application/model/PageAndSizeParams";
import { IPage } from "../../../../infrestructure/pageable-manager/IPage";
import { UserResultList } from "../../../../application/model/user-manager/UserResultList";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { IUserStatusEngineRepository } from "../../../repository/IUserStatusEngineRepository";
import { UserStatus } from "../../../model/UserStatus";
import { User } from "../../../model/User";
import { UserResponse } from "../../response-builder/user-manager/UserResponse";




export class GetAllUserOperation extends UserAuthOperationTemplate<UserResultList, PageAndSizeParams>{

    private userRepository: IUserEngineRepository;
    private userStatusRepository: IUserStatusEngineRepository;
    private status: UserStatus;

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")
        this.userStatusRepository = container.resolve<IUserStatusEngineRepository>("IUserStatusEngineRepository")

    }

    protected async doValidateParameters(params: PageAndSizeParams): Promise<void> {

        if (params.getQueryParam) {
            this.status = await this.userStatusRepository.findStatusCode(params.getQueryParam);

            if (!this.status) {
                logger.error("[GetAllUserOperation] Status not found")
                throw new NotFoundException(Field.USER, MiddlewareBusinessMessage.USER_STATUS_NOT_FOUND);
            }
        }

    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: UserResultList): Promise<void> {


        logger.info("[GetAllUserOperation] creating all users")
        const users: IPage<User> = await this.userRepository.findAllUsers(params.getPage, params.size, this.status, params.orderColumn, params.direction);
        const userResponses: UserResponse[] = users.content.map(user => new UserResponse(user));
        console.info("USER RESPONSE", JSON.stringify(userResponses))

        const responseObj = {
            users: userResponses
        };
        Object.assign(result, responseObj);


    }

    protected initResult(): UserResultList {
        return new UserResultList()
    }

}

