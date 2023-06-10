import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { GetByEmailOrCodeParams } from "../../../../application/model/GetByEmailOrCodeParams";
import { PermissionGroupResult } from "../../../../application/model/user-manager/PermissionGroupResult";
import { IPermissionGroupEngineRepository } from "../../../repository/IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../../model/PermissionGroup";




export class GetPermissionGrouByCodeOperation extends UserAuthOperationTemplate<PermissionGroupResult, GetByEmailOrCodeParams>{

    private permissionGroupRepository: IPermissionGroupEngineRepository;
    private permissonGroup: PermissionGroup;

    constructor() {
        super(OperationNamesEnum.ROLE_GET_BY_NAME, OperationValidatorManager.getSingletonInstance())
        this.permissionGroupRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")

    }

    protected async doValidateParameters(params: GetByEmailOrCodeParams): Promise<void> {

        this.permissonGroup = await this.permissionGroupRepository.findPermissionGroupByCode(params.getValue);
        if (!this.permissonGroup) {
            logger.error("[GetPermissionGrouByCodeOperation] permissonGroup not exist")
            throw new NotFoundException(Field.USER, MiddlewareBusinessMessage.PERMISSION_GROUP_NOT_FOUND);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByEmailOrCodeParams, result: PermissionGroupResult): Promise<void> {

        logger.info("[GetPermissionGrouByCodeOperation] get users")
      //   this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.PERMISSION_GROUP_GET_SUCCESSFULLY));
       //  result.setStatus = Object.fromEntries(this.message)

        result.setPermission = this.permissonGroup;

    }

    protected initResult(): PermissionGroupResult {
        return new PermissionGroupResult()
    }

}

