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
import { PermissionGroupResultList } from "../../../../application/model/user-manager/PermissionGroupResultList";
import { IPermissionGroupEngineRepository } from "../../../repository/IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../../model/PermissionGroup";




export class GetAllPermissionGroupOperation extends UserAuthOperationTemplate<PermissionGroupResultList, PageAndSizeParams>{

    private permissionRepository: IPermissionGroupEngineRepository;

    constructor() {
        super(OperationNamesEnum.ROLE_GET_ALL_ROLE, OperationValidatorManager.getSingletonInstance())
        this.permissionRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")

    }

    protected async doValidateParameters(params: PageAndSizeParams): Promise<void> {


    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PageAndSizeParams, result: PermissionGroupResultList): Promise<void> {


        logger.info("[GetAllPermissionGroupOperation] creating all users")
        const permission:IPage<PermissionGroup> = await this.permissionRepository.findAllPermissionGroups(params.getPage, params.size,params.orderColumn,params.direction);
        //PageableUtils.ofWithoutContent(result, newNews)

        Object.assign(result,permission);

        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.PERMISSION_GROUP_LIST_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): PermissionGroupResultList {
        return new PermissionGroupResultList()
    }

}

