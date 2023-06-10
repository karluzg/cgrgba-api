import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { PageAndSizeParams } from "../../../../application/model/PageAndSizeParams";
import { IPage } from "../../../../infrestructure/pageable-manager/IPage";
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
    
        Object.assign(result,roles);
    }

    protected initResult(): RoleResultList {
        return new RoleResultList()
    }

}

