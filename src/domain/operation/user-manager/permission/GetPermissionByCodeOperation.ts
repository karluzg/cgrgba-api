import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { GetByEmailOrCodeParams } from "../../../../application/model/GetByEmailOrCodeParams";
import { PermissionResult } from "../../../../application/model/user-manager/PermissionResult";
import { IPermissionEngineRepository } from "../../../repository/IPermissionEngineRepository";
import { Permission } from "../../../model/Permission";




export class GetPermissionByCodeOperation extends UserAuthOperationTemplate<PermissionResult, GetByEmailOrCodeParams>{

    private permissionRepository: IPermissionEngineRepository;
    private permission: Permission;

    constructor() {
        super(OperationNamesEnum.ROLE_GET_BY_NAME, OperationValidatorManager.getSingletonInstance())
        this.permissionRepository = container.resolve<IPermissionEngineRepository>("IPermissionEngineRepository")

    }

    protected async doValidateParameters(params: GetByEmailOrCodeParams): Promise<void> {

        this.permission = await this.permissionRepository.findPermissionByCode(params.getValue);
        if (!this.permission) {
            logger.error("[GetPermissionByCodeOperation] permission not exist")
            throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByEmailOrCodeParams, result: PermissionResult): Promise<void> {

        logger.info("[GetPermissionByCodeOperation] get users")
        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.PERMISSION_GET_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

        result.setPermission = this.permission;

    }

    protected initResult(): PermissionResult {
        return new PermissionResult()
    }

}

