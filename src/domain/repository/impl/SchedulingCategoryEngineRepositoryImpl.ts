import { SchedulingCategory } from "../../model/SchedulingCategory";
import { ISchedulingCategoryEngineRepository } from "../ISchedulingCategoryEngineRepository";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingCategoryEngineRepository = myDataSource.getRepository(SchedulingCategory)


export class SchedulingCategoryEngineRepositoryImpl implements ISchedulingCategoryEngineRepository {
    async findServiceByCategory(categoryCode: string): Promise<SchedulingCategory[]> {

        return await schedulingCategoryEngineRepository.createQueryBuilder('schedulingCategory')
            .leftJoinAndSelect("schedulingCategory.services", "service")
            .where('schedulingCategory.code = :categoryCode', { categoryCode })
            .getMany()

    }

}