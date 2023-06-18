import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { GetByEmailOrCodeParams } from "../../../../application/model/GetByEmailOrCodeParams";
import { RoleResult } from "../../../../application/model/user-manager/RoleResult ";
import { IRoleEngineRepository } from "../../../repository/IRoleEngineRepository";
import { Role } from "../../../model/Role";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";




export class GetRoleByNameOperation extends UserAuthOperationTemplate<RoleResult, GetByEmailOrCodeParams>{

    private roleRepository: IRoleEngineRepository;
    private role: Role;

    constructor() {
        super(OperationNamesEnum.ROLE_GET_BY_NAME, OperationValidatorManager.getSingletonInstance())
        this.roleRepository = container.resolve<IRoleEngineRepository>("IRoleEngineRepository")

    }

    protected async doValidateParameters(params: GetByEmailOrCodeParams): Promise<void> {

        this.role = await this.roleRepository.findRoleByName(params.getValue);
        if (!this.role) {
            logger.error("[GetRoleByNameOperation] role not exist")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.USER_NOT_EXIST);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByEmailOrCodeParams, result: RoleResult): Promise<void> {

        logger.info("[GetRoleByNameOperation] get role")

        result.setRole = this.role;

    }

    protected initResult(): RoleResult {
        return new RoleResult()
    }

}

