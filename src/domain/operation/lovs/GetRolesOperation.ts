import { container } from "tsyringe";
import { GetRolesResult } from "../../../application/model/lovs/GetRolesResult";
import { GetRolesParams } from "../../../application/model/lovs/params/GetRolesParams";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { Role } from "../../model/Role";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { IRoleEngineRepository } from "../../repository/IRoleEngineRepository";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";

export class GetRolesOperation extends UserAuthOperationTemplate<GetRolesResult, GetRolesParams>{


    private readonly roleEngineRepository: IRoleEngineRepository;

    private services: Role[];


    constructor() {
        super(OperationNamesEnum.ROLE_GET_ALL_ROLE, OperationValidatorManager.getSingletonInstance())

        this.roleEngineRepository = container.resolve<IRoleEngineRepository>('IRoleEngineRepository')
    }



    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetRolesParams, result: GetRolesResult): Promise<void> {

        result.setRoles = await this.roleEngineRepository.getAllRoles()

    }
    protected initResult(): GetRolesResult {
        return new GetRolesResult();
    }

}