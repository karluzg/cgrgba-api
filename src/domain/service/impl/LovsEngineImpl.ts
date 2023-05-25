import { CategoryParams } from "../../../application/model/lovs/CategoryParams";
import { CategoryResult } from "../../../application/model/lovs/CategoryResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { GetServicesByCategoryOperation } from "../../operation/lovs/GetServicesByCategoryOperation";
import { ILovsEngine } from "../ILovsEngine";

export class LovsEngineImpl extends GenericOperationTemplate implements ILovsEngine {
    get_service_by_categry(params: CategoryParams): Promise<CategoryResult> {
        return this.executeOperation(new GetServicesByCategoryOperation(), params)
    }

}