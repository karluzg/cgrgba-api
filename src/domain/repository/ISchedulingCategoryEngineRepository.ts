import { SchedulingCategory } from "../model/SchedulingCategory";

export interface ISchedulingCategoryEngineRepository {

    findServiceByCategory(categoryCode: string): Promise<SchedulingCategory[]>
    
    findAllCategory(): Promise<SchedulingCategory[]>
}