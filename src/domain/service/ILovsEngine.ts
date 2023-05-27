import { CategoryParams } from "../../application/model/lovs/CategoryParams";
import { CategoryResult } from "../../application/model/lovs/CategoryResult";


export interface ILovsEngine {
    get_service_by_categry(params: CategoryParams): Promise<CategoryResult>
}