import { Hollyday } from "../../model/Hollyday";
import { IHollydayRespository } from "../IHollydayRespository";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingTimeRepository = myDataSource.getRepository(Hollyday)

export class HollydayRespositoryImpl implements IHollydayRespository {

    async findByHollydayDate(hollydayDate: Date): Promise<Hollyday> {

        return await schedulingTimeRepository.createQueryBuilder('hollyday')
            .where('hollyday.hollydayDate = :hollydayDate', { holidayDate: hollydayDate }).getOne()
    }
}

