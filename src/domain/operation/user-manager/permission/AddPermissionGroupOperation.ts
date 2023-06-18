import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../../model/TokenSession";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { container } from 'tsyringe'
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { PermissionGroupParams } from "../../../../application/model/user-manager/PermissionGroupParams";
import { PermissionGroupResult } from "../../../../application/model/user-manager/PermissionGroupResult";
import { IPermissionGroupEngineRepository } from "../../../repository/IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../../model/PermissionGroup";



export class AddPermissionGroupOperation extends UserAuthOperationTemplate<PermissionGroupResult, PermissionGroupParams>{

    private permissionRepository: IPermissionGroupEngineRepository;

    constructor() {
        super(OperationNamesEnum.PERMISSION_GROUP_ADD, OperationValidatorManager.getSingletonInstance())
        this.permissionRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")
    }

    protected async doValidateParameters(params: PermissionGroupParams): Promise<void> {

        let permissionGroup = await this.permissionRepository.findPermissionGroupByCode(params.getCode)
        logger.info("[AddPermissionGroupOperation] PermissionGroup founded", JSON.stringify(permissionGroup))

        if (permissionGroup) {
          
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.PERMISSION_GROUP_ALREADY_EXIST);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PermissionGroupParams, result: PermissionGroupResult): Promise<void> {


        const permissionGroup = new PermissionGroup(); // status is created automatically in user constructor
        permissionGroup.code= params.getCode;
        permissionGroup.description= params.getDescription;


        logger.info("[AddPermissionGroupOperation] creating permissionGroup in Data Base", JSON.stringify(permissionGroup))
        try {
            const newPermissionGroup: PermissionGroup = await this.permissionRepository.savePermissionGroup(permissionGroup)
            result.setPermission = newPermissionGroup;
        } catch (error) {
            console.log(error)
        }
     

    }

    protected initResult(): PermissionGroupResult {
        return new PermissionGroupResult()
    }

}

