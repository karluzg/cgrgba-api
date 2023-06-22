import { ServiceParams } from "../../../application/model/lovs/params/ServiceParams";
import { ServiceResult } from "../../../application/model/lovs/ServiceResult";
import { GetRolesResult } from "../../../application/model/lovs/GetRolesResult";
import { GetRolesParams } from "../../../application/model/lovs/params/GetRolesParams";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { GetRolesOperation } from "../../operation/lovs/GetRolesOperation";
import { GetServicesByCategoryOperation } from "../../operation/lovs/GetServicesByCategoryOperation";
import { ILovsEngine } from "../ILovsEngine";
import { CategoryResult } from "../../../application/model/lovs/CategoryResult";
import { CategoryParams } from "../../../application/model/lovs/params/CategoryParams";
import { param } from "express-validator";
import { GetSchedulingCategoryOperation } from "../../operation/lovs/GetSchedulingCategoryOperation";

export class LovsEngineImpl extends GenericOperationTemplate implements ILovsEngine {
  
   
    get_service_by_categry(params: ServiceParams): Promise<ServiceResult> {
        return this.executeOperation(new GetServicesByCategoryOperation(), params)
    }

    get_roles(params: GetRolesParams): Promise<GetRolesResult> {
       return this.executeOperation(new GetRolesOperation(),params)
    }

    get_scheduling_category(params: CategoryParams): Promise<CategoryResult> {
        return this.executeOperation(new GetSchedulingCategoryOperation(),params)
    }
    

}