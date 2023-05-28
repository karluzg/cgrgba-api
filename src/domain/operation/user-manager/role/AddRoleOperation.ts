
import { UserParams } from "../../../../application/model/user-manager/UserParams";
import { UserResult } from "../../../../application/model/user-manager/UserResult";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../../model/TokenSession";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { User } from "../../../model/User";
import { IUserEngineRepository } from "../../../repository/IUserEngineRepository";
import { container } from 'tsyringe'
import { PasswordValidator } from "../../../../infrestructure/validator/managers/PasswordValidator";
import { UserStatusEnum } from "../../../model/enum/UserStatusEnum";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { GeneratePassowordUtil } from "../../util/GeneratePassowordUtil";
import { ResultInfo } from "../../../../infrestructure/response/ResultInfo";
import { EmailTemplate } from "../../../../infrestructure/template/EmailTemplate";
import { PlataformConfig } from "../../../../infrestructure/config/plataform";
import { EmailUtils } from "../../util/EmailUtils";
import { IRoleEngineRepository } from "../../../repository/IRoleEngineRepository";
import { forEach } from "lodash";
import { Role } from "../../../model/Role";
import { NotFoundError } from "routing-controllers";
import { NotFoundException } from "../../../../infrestructure/exceptions/NotFoundExcecption";
import { RoleResult } from "../../../../application/model/user-manager/RoleResult ";
import { RoleParams } from "../../../../application/model/user-manager/RoleParams";
import { IPermissionEngineRepository } from "../../../repository/IPermissionEngineRepository";
import { Permission } from "../../../model/Permission";
import e from "express";



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

        if (role) {
            logger.error("[AddRoleOperation] role already exist")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.ROLE_ALREADY_EXIST);
        }

        if (params.getPermissions) {
            for (const permission of params.getPermissions) {
              const permissionEntity = await this.permissionRepository.findPermissionByCode(permission);
              if (!permissionEntity) {
                logger.error("[AddRoleOperation] Permission not found");
                throw new NotFoundException(Field.USER, MiddlewareBusinessMessage.PERMISSION_NOT_FOUND);
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


        console.info("WATCH Role TO ADD:" + JSON.stringify(role))

        logger.info("[AddRoleOperation] creating role in db %", JSON.stringify(role))
        try {
            const newRole: Role = await this.rolesRepository.saveRole(role)
            result.setRole = newRole;
        } catch (error) {
            console.log(error)
        }
     
    

        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.ROLE_ADDED_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

    }

    protected initResult(): RoleResult {
        return new RoleResult()
    }

}

