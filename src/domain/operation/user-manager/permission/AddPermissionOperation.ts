import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../../model/TokenSession";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { container } from 'tsyringe'
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { IPermissionEngineRepository } from "../../../repository/IPermissionEngineRepository";
import { Permission } from "../../../model/Permission";
import { PermissionParams } from "../../../../application/model/user-manager/PermissionParams ";
import { PermissionResult } from "../../../../application/model/user-manager/PermissionResult";
import { IPermissionGroupEngineRepository } from "../../../repository/IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../../model/PermissionGroup";



export class AddPermissionOperation extends UserAuthOperationTemplate<PermissionResult, PermissionParams>{

    private permissionRepository: IPermissionEngineRepository;
    private permissionGroupRepository: IPermissionGroupEngineRepository;
    private permissionGroup: PermissionGroup;

    constructor() {
        super(OperationNamesEnum.ROLE_ADD, OperationValidatorManager.getSingletonInstance())
        this.permissionRepository = container.resolve<IPermissionEngineRepository>("IPermissionEngineRepository")
        this.permissionGroupRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")
    }

    protected async doValidateParameters(params: PermissionParams): Promise<void> {

        let permission = await this.permissionRepository.findPermissionByCode(params.getCode)

        if (permission) {
            logger.error("[AddPermissionOperation] permission already exist")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.PERMISSION_ALREADY_EXIST);
        }

        if (params.getGroup) {
            const permissionEntity = await this.permissionGroupRepository.findPermissionGroupByCode(params.getGroup);
            if (!permissionEntity) {
                logger.error("[AddPermissionOperation] permissionGroup not found");
                throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.PERMISSION_GROUP_NOT_EXIST);
            } else
                this.permissionGroup = permissionEntity
        }

    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PermissionParams, result: PermissionResult): Promise<void> {




        const permission = new Permission(); // status is created automatically in user constructor
        permission.code = params.code;
        permission.description = params.getDescription;
        permission.permissionGroup = this.permissionGroup


        console.info("WATCH permission TO ADD:" + JSON.stringify(permission))

        logger.info("[AddPermissionOperation] creating permission in db %", JSON.stringify(permission))

        const newPermisson: Permission = await this.permissionRepository.savePermission(permission)
        result.setPermission = newPermisson;

    }

    protected initResult(): PermissionResult {
        return new PermissionResult()
    }

}

