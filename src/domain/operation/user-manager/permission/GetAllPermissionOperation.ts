import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { PageAndSizeParams } from "../../../../application/model/PageAndSizeParams";
import { IPage } from "../../../../infrestructure/pageable-manager/IPage";
import { PermissionResultList } from "../../../../application/model/user-manager/PermissionResultList";
import { Permission } from "../../../model/Permission";
import { IPermissionEngineRepository } from "../../../repository/IPermissionEngineRepository";




export class GetAllPermissionOperation extends UserAuthOperationTemplate<PermissionResultList, PageAndSizeParams>{

    private permissionRepository: IPermissionEngineRepository;

    constructor() {
        super(OperationNamesEnum.ROLE_GET_ALL_ROLE, OperationValidatorManager.getSingletonInstance())
        this.permissionRepository = container.resolve<IPermissionEngineRepository>("IPermissionEngineRepository")

    }

    protected async doValidateParameters(params: PageAndSizeParams): Promise<void> {


    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: PermissionResultList): Promise<void> {


        logger.info("[GetAllPermissionOperation] creating all users")
        const permission:IPage<Permission> = await this.permissionRepository.findAllPermissions(params.getPage, params.size,params.orderColumn,params.direction);
        //PageableUtils.ofWithoutContent(result, newNews)

        Object.assign(result,permission);

        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.PERMISSION_GET_LIST_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): PermissionResultList {
        return new PermissionResultList()
    }

}

