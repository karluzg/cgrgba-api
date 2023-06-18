
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../../model/TokenSession";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { container } from 'tsyringe'
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";;
import { IRoleEngineRepository } from "../../../repository/IRoleEngineRepository";
import { Role } from "../../../model/Role";
import { RoleResult } from "../../../../application/model/user-manager/RoleResult ";
import { RoleParams } from "../../../../application/model/user-manager/RoleParams";
import { IPermissionEngineRepository } from "../../../repository/IPermissionEngineRepository";
import { Permission } from "../../../model/Permission";



export class AddRoleOperation extends UserAuthOperationTemplate<RoleResult, RoleParams>{

    private permissionRepository: IPermissionEngineRepository;
    private rolesRepository: IRoleEngineRepository;
    private permissions: Permission[];

    constructor() {
        super(OperationNamesEnum.ROLE_ADD, OperationValidatorManager.getSingletonInstance())
        this.permissionRepository = container.resolve<IPermissionEngineRepository>("IPermissionEngineRepository")
        this.rolesRepository = container.resolve<IRoleEngineRepository>("IRoleEngineRepository")
        this.permissions = [];
    }

    protected async doValidateParameters(params: RoleParams): Promise<void> {

        let role = await this.rolesRepository.findRoleByName(params.getName)
        logger.info("[AddRoleOperation] Role founded,", JSON.stringify(role))

        if (role) {

            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.ROLE_ALREADY_EXIST);
        }

        if (params.getPermissions) {
            for (const permission of params.getPermissions) {
              const permissionEntity = await this.permissionRepository.findPermissionByCode(permission);
              if (!permissionEntity) {
                  throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.PERMISSION_NOT_EXIST);
              } else {
                this.permissions.push(permissionEntity);
              }
            }
          }

    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: RoleParams, result: RoleResult): Promise<void> {


        const role = new Role(); // status is created automatically in user constructor
        role.name= params.getName;
        role.description= params.getDescription;
        role.permissions= this.permissions
        role.isAdmin= params.getIsAdmin

        logger.info("[AddRoleOperation] creating role in db %", JSON.stringify(role))
        try {
            const newRole: Role = await this.rolesRepository.saveRole(role)
            result.setRole = newRole;
        } catch (error) {
            console.log(error)
        }
     
    }

    protected initResult(): RoleResult {
        return new RoleResult()
    }

}

