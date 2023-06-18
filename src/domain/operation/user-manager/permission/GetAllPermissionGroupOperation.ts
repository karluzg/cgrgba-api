import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { PageAndSizeParams } from "../../../../application/model/PageAndSizeParams";
import { IPage } from "../../../../infrestructure/pageable-manager/IPage";
import { PermissionGroupResultList } from "../../../../application/model/user-manager/PermissionGroupResultList";
import { IPermissionGroupEngineRepository } from "../../../repository/IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../../model/PermissionGroup";




export class GetAllPermissionGroupOperation extends UserAuthOperationTemplate<PermissionGroupResultList, PageAndSizeParams>{

    private permissionRepository: IPermissionGroupEngineRepository;

    constructor() {
        super(OperationNamesEnum.PERMISSION_GROUP_GET_LIST, OperationValidatorManager.getSingletonInstance())
        this.permissionRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")

    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: PermissionGroupResultList): Promise<void> {


        logger.info("[GetAllPermissionGroupOperation] creating all users")
        const permission:IPage<PermissionGroup> = await this.permissionRepository.findAllPermissionGroups(params.getPage, params.size,params.orderColumn,params.direction);
    
        Object.assign(result,permission);

   
    }

    protected initResult(): PermissionGroupResultList {
        return new PermissionGroupResultList()
    }

}

