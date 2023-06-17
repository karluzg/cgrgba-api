import { CategoryParams } from "../../application/model/lovs/CategoryParams";
import { CategoryResult } from "../../application/model/lovs/CategoryResult";
import { GetRolesResult } from "../../application/model/lovs/GetRolesResult";
import { GetRolesParams } from "../../application/model/lovs/params/GetRolesParams";


export interface ILovsEngine {
    get_service_by_categry(params: CategoryParams): Promise<CategoryResult>
    get_roles(params: GetRolesParams): Promise<GetRolesResult>
}