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
import { RoleResult } from "../../../../application/model/user-manager/RoleResult ";
import { IRoleEngineRepository } from "../../../repository/IRoleEngineRepository";
import { Role } from "../../../model/Role";




export class GetRoleByIdOperation extends UserAuthOperationTemplate<RoleResult, GetByIdParams>{

    private roleRepository: IRoleEngineRepository;
    private role: Role;

    constructor() {
        super(OperationNamesEnum.ROLE_GET_BY_ID, OperationValidatorManager.getSingletonInstance())
        this.roleRepository = container.resolve<IRoleEngineRepository>("IRoleEngineRepository")

    }

    protected async doValidateParameters(params: GetByIdParams): Promise<void> {

        this.role = await this.roleRepository.findRoleById(params.getId);
        if (!this.role) {
            logger.error("[GetUserByIdIOperation] user not exist")
            throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.ROLE_NOT_FOUND);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByIdParams, result: RoleResult): Promise<void> {

        logger.info("[GetUserByIdIOperation] get users")
        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.ROLE_GET_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

        result.setRole = this.role;

    }

    protected initResult(): RoleResult {
        return new RoleResult()
    }

}

