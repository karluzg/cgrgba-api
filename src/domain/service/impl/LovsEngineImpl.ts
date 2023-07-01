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
import { GetSchedulingCategoryOperation } from "../../operation/lovs/GetSchedulingCategoryOperation";
import { FeedbackMessageTypeResult } from "../../../application/model/lovs/FeedbackMessageTypeResult";
import { FeedbackMessageTypeParams } from "../../../application/model/lovs/params/FeedbackMessageTypeParams";
import { FeedbackMessageTypeOperation } from "../../operation/lovs/FeedbackMessageTypeOperation";

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
    
    get_feedback_message_type(params: FeedbackMessageTypeParams): Promise<FeedbackMessageTypeResult> {
        return this.executeOperation(new FeedbackMessageTypeOperation(),params)
    }
  

}