import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { PageAndSizeParams } from "../../../../application/model/PageAndSizeParams";
import { IPage } from "../../../../infrestructure/pageable-manager/IPage";
import { PermissionResultList } from "../../../../application/model/user-manager/PermissionResultList";
import { Permission } from "../../../model/Permission";
import { IPermissionEngineRepository } from "../../../repository/IPermissionEngineRepository";




export class GetAllPermissionOperation extends UserAuthOperationTemplate<PermissionResultList, PageAndSizeParams>{

    private permissionRepository: IPermissionEngineRepository;

    constructor() {
        super(OperationNamesEnum.PERMISSION_GET_LIST, OperationValidatorManager.getSingletonInstance())
        this.permissionRepository = container.resolve<IPermissionEngineRepository>("IPermissionEngineRepository")

    }

    protected async doValidateParameters(params: PageAndSizeParams): Promise<void> {


    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: PermissionResultList): Promise<void> {


        logger.info("[GetAllPermissionOperation] creating all users")
        const permission:IPage<Permission> = await this.permissionRepository.findAllPermissions(params.getPage, params.size,params.orderColumn,params.direction);


        Object.assign(result,permission);


    }

    protected initResult(): PermissionResultList {
        return new PermissionResultList()
    }

}

