import { CategoryEnum } from "../../../../domain/model/enum/CategoryEnum";
import { ParamsTemplate } from "../../../../infrestructure/template/ParamsTemplate";

export class ServiceParams extends ParamsTemplate {

    private readonly categoryCode: CategoryEnum
    constructor(categoryCode: CategoryEnum) {
        super()
        this.categoryCode = categoryCode

    }

    get getCategoryCode(): CategoryEnum {
        return this.categoryCode;
    }
}