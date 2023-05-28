import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../../model/TokenSession";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { container } from 'tsyringe'
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { PermissionGroupParams } from "../../../../application/model/user-manager/PermissionGroupParams";
import { PermissionGroupResult } from "../../../../application/model/user-manager/PermissionGroupResult";
import { IPermissionGroupEngineRepository } from "../../../repository/IPermissionGroupEngineRepository";
import { PermissionGroup } from "../../../model/PermissionGroup";



export class AddPermissionGroupOperation extends UserAuthOperationTemplate<PermissionGroupResult, PermissionGroupParams>{

    private permissionRepository: IPermissionGroupEngineRepository;

    constructor() {
        super(OperationNamesEnum.ROLE_ADD, OperationValidatorManager.getSingletonInstance())
        this.permissionRepository = container.resolve<IPermissionGroupEngineRepository>("IPermissionGroupEngineRepository")
    }

    protected async doValidateParameters(params: PermissionGroupParams): Promise<void> {

        let permissionGroup = await this.permissionRepository.findPermissionGroupByCode(params.getCode)

        if (permissionGroup) {
            logger.error("[AddPermissionGroupOperation] permissionGroup already exist")
            throw new InvalidParametersException(Field.EMAIL, MiddlewareBusinessMessage.PERMISSION_GROUP_ALREADY_EXIST);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: PermissionGroupParams, result: PermissionGroupResult): Promise<void> {




        const permissionGroup = new PermissionGroup(); // status is created automatically in user constructor
        permissionGroup.code= params.getCode;
        permissionGroup.description= params.getDescription;


        console.info("WATCH permissionGroup TO ADD:" + JSON.stringify(permissionGroup))

        logger.info("[AddPermissionGroupOperation] creating permissionGroup in db %", JSON.stringify(permissionGroup))
        try {
            const newPermissionGroup: PermissionGroup = await this.permissionRepository.savePermissionGroup(permissionGroup)
            result.setPermission = newPermissionGroup;
        } catch (error) {
            console.log(error)
        }
     
    

        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.PERMISSION_GROUP_ADDED_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): PermissionGroupResult {
        return new PermissionGroupResult()
    }

}

