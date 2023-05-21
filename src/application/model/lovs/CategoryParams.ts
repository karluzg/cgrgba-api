import { CategoryEum } from "../../../domain/model/enum/CategoryEnum";
import { ParamsTemplate } from "../../../infrestructure/template/ParamsTemplate";

export class CategoryParams extends ParamsTemplate {

    private readonly categoryCode: CategoryEum
    constructor(categoryCode: CategoryEum) {
        super()
        this.categoryCode = categoryCode

    }

    get getCategoryCode(): CategoryEum {
        return this.categoryCode;
    }
}