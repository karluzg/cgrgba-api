import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { GetByEmailOrCodeParams } from "../../../../application/model/GetByEmailOrCodeParams";
import { PermissionGroupResult } from "../../../../application/model/user-manager/PermissionGroupResult";
import { IPermissionGroupEngineRepository } from "../../../repository/IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../../model/PermissionGroup";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";




export class GetPermissionGrouByCodeOperation extends UserAuthOperationTemplate<PermissionGroupResult, GetByEmailOrCodeParams>{

    private permissionGroupRepository: IPermissionGroupEngineRepository;
    private permissonGroup: PermissionGroup;

    constructor() {
        super(OperationNamesEnum.PERMISSION_GROUP_GET_BY_CODE, OperationValidatorManager.getSingletonInstance())
        this.permissionGroupRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")

    }

    protected async doValidateParameters(params: GetByEmailOrCodeParams): Promise<void> {

        this.permissonGroup = await this.permissionGroupRepository.findPermissionGroupByCode(params.getValue);
        logger.info("[GetPermissionGrouByCodeOperation] PermissonGroup founded", JSON.stringify(this.permissonGroup ))
        if (!this.permissonGroup) {
    
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.PERMISSION_GROUP_NOT_EXIST);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByEmailOrCodeParams, result: PermissionGroupResult): Promise<void> {

        logger.info("[GetPermissionGrouByCodeOperation] Get users")
      //   this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.PERMISSION_GROUP_GET_SUCCESSFULLY));
       //  result.setStatus = Object.fromEntries(this.message)

        result.setPermission = this.permissonGroup;

    }

    protected initResult(): PermissionGroupResult {
        return new PermissionGroupResult()
    }

}

