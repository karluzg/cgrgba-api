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
import { RoleResult } from "../../../../application/model/user-manager/RoleResult ";
import { IRoleEngineRepository } from "../../../repository/IRoleEngineRepository";
import { Role } from "../../../model/Role";




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
            logger.error("[GetRoleByNameOperation] user not exist")
            throw new NotFoundException(Field.SYSTEM, MiddlewareBusinessMessage.USER_NOT_FOUND);
        }
    }

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetByEmailOrCodeParams, result: RoleResult): Promise<void> {

        logger.info("[GetRoleByNameOperation] get users")
        this.message.set(Field.INFO, new ResultInfo(MiddlewareBusinessMessage.ROLE_GET_SUCCESSFULLY));
        result.setStatus = Object.fromEntries(this.message)

        result.setRole = this.role;

    }

    protected initResult(): RoleResult {
        return new RoleResult()
    }

}

