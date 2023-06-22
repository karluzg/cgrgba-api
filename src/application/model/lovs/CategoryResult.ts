import { SchedulingCategory } from "../../../domain/model/SchedulingCategory";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class CategoryResult extends ResultTemplate {
    
    private categories: SchedulingCategory[]

    constructor() {
        super();
        this.getSuccessfullyMessage();
    }


    public get getCategories(): SchedulingCategory[] {
        return this.categories;
    }
    public set setCategories(categories: SchedulingCategory[]) {
        this.categories = categories;
    }

}