import { CategoryParams } from "../../../application/model/lovs/CategoryParams";
import { CategoryResult } from "../../../application/model/lovs/CategoryResult";
import { GetRolesResult } from "../../../application/model/lovs/GetRolesResult";
import { GetRolesParams } from "../../../application/model/lovs/params/GetRolesParams";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { GetRolesOperation } from "../../operation/lovs/GetRolesOperation";
import { GetServicesByCategoryOperation } from "../../operation/lovs/GetServicesByCategoryOperation";
import { ILovsEngine } from "../ILovsEngine";

export class LovsEngineImpl extends GenericOperationTemplate implements ILovsEngine {
   
    get_service_by_categry(params: CategoryParams): Promise<CategoryResult> {
        return this.executeOperation(new GetServicesByCategoryOperation(), params)
    }

    get_roles(params: GetRolesParams): Promise<GetRolesResult> {
       return this.executeOperation(new GetRolesOperation(),params)
    }

}