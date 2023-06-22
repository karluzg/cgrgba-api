import { ServiceParams } from "../../application/model/lovs/params/ServiceParams";
import { ServiceResult } from "../../application/model/lovs/ServiceResult";
import { GetRolesResult } from "../../application/model/lovs/GetRolesResult";
import { GetRolesParams } from "../../application/model/lovs/params/GetRolesParams";
import { CategoryParams } from "../../application/model/lovs/params/CategoryParams";
import { CategoryResult } from "../../application/model/lovs/CategoryResult";


export interface ILovsEngine {
    get_service_by_categry(params: ServiceParams): Promise<ServiceResult>
    get_roles(params: GetRolesParams): Promise<GetRolesResult>
    get_scheduling_category(params: CategoryParams): Promise<CategoryResult>
}