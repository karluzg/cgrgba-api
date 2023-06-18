import { container } from "tsyringe";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import logger from "../../../../infrestructure/config/logger";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { GetByIdParams } from "../../../../application/model/GetByIdParams";
import { RoleResult } from "../../../../application/model/user-manager/RoleResult ";
import { IRoleEngineRepository } from "../../../repository/IRoleEngineRepository";
import { Role } from "../../../model/Role";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";




export class GetRoleByIdOperation extends UserAuthOperationTemplate<RoleResult, GetByIdParams>{

    private roleRepository: IRoleEngineRepository;
    private role: Role;

    constructor() {
        super(OperationNamesEnum.ROLE_GET_BY_ID, OperationValidatorManager.getSingletonInstance())
        this.roleRepository = container.resolve<IRoleEngineRepository>("IRoleEngineRepository")

    }

    protected async doValidateParameters(params: GetByIdParams): Promise<void> {

        this.role = await this.roleRepository.findRoleById(params.getId);
        if (!this.role) {
            logger.error("[GetRoleByIdOperation] role not exist")
            throw new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.ROLE_NOT_EXIST);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByIdParams, result: RoleResult): Promise<void> {

        result.setRole = this.role;

    }

    protected initResult(): RoleResult {
        return new RoleResult()
    }

}

