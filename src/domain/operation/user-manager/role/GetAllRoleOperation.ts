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
import { RoleResultList } from "../../../../application/model/user-manager/RoleResultList";
import { IRoleEngineRepository } from "../../../repository/IRoleEngineRepository";
import { Role } from "../../../model/Role";




export class GetAllRoleOperation extends UserAuthOperationTemplate<RoleResultList, PageAndSizeParams>{

    private roleRepository: IRoleEngineRepository;

    constructor() {
        super(OperationNamesEnum.ROLE_GET_ALL_ROLE, OperationValidatorManager.getSingletonInstance())
        this.roleRepository = container.resolve<IRoleEngineRepository>("IRoleEngineRepository")

    }

    protected async doValidateParameters(params: PageAndSizeParams): Promise<void> {


    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: RoleResultList): Promise<void> {


        logger.info("[GetAllUserOperation] creating all users")
        const roles:IPage<Role> = await this.roleRepository.findAllRoles(params.getPage, params.size,params.orderColumn,params.direction);
        //PageableUtils.ofWithoutContent(result, newNews)

        Object.assign(result,roles);

        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.ROLE_GET_LIST_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): RoleResultList {
        return new RoleResultList()
    }

}

