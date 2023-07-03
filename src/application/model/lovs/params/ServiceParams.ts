
import { ParamsTemplate } from "../../../../infrestructure/template/ParamsTemplate";

export class ServiceParams extends ParamsTemplate {

    private readonly categoryCode: string
    constructor(categoryCode: string) {
        super()
        this.categoryCode = categoryCode

    }

    get getCategoryCode(): string {
        return this.categoryCode;
    }
}