import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { INewsEngineRepository } from "../../../repository/INewsEngineRepository";
import { NewsCategory } from "../../../model/NewsCategory";
import { INewsCategoryEngineRepository } from "../../../repository/INewsCategoryEngineRepository";
import logger from "../../../../infrestructure/config/logger";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { News } from "../../../model/News";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { NewsResultList } from "../../../../application/model/news-manager/NewsResultList";
import { PageAndSizeParams } from "../../../../application/model/PageAndSizeParams";
import { IPage } from "../../../../infrestructure/pageable-manager/IPage";
import { UserResultList } from "../../../../application/model/user-manager/UserResultList";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { IUserStatusEngineRepository } from "../../../repository/IUserStatusEngineRepository";
import { UserStatus } from "../../../model/UserStatus";
import { User } from "../../../model/User";
import { GetByIdParams } from "../../../../application/model/GetByIdParams";
import { UserResult } from "../../../../application/model/user-manager/UserResult";
import { GetByEmailOrCodeParams } from "../../../../application/model/GetByEmailOrCodeParams";
import { RoleResult } from "../../../../application/model/user-manager/RoleResult ";




export class GetRoleByNameOperation extends UserAuthOperationTemplate<RoleResult, GetByEmailOrCodeParams>{

    private userRepository: IUserEngineRepository;
    private user: User;

    constructor() {
        super(OperationNamesEnum.USER_CREATE, OperationValidatorManager.getSingletonInstance())
        this.userRepository = container.resolve<IUserEngineRepository>("IUserEngineRepository")

    }

    protected async doValidateParameters(params: GetByEmailOrCodeParams): Promise<void> {

        this.user = await this.userRepository.findUserByEmail(params.getValue);
        if (!this.user) {
            logger.error("[GetRoleByNameOperation] user not exist")
            throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByEmailOrCodeParams, result: RoleResult): Promise<void> {

        logger.info("[GetRoleByNameOperation] get users")
        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.USER_GET_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

       /* result.setUser = this.user;*/

    }

    protected initResult(): RoleResult {
        return new RoleResult()
    }

}

