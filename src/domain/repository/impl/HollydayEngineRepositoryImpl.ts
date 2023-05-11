
import { Hollyday } from "../../model/Hollyday";
import { IHollydayEngineRepository as IHollydayEngineRepository } from "../IHollydayEngineRepository";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingHollydayRepository = myDataSource.getRepository(Hollyday)

export class HollydayEngineRepositoryImpl implements IHollydayEngineRepository {

    async findByHollydayDate(hollydayDate: Date): Promise<Hollyday> {

        return schedulingHollydayRepository.createQueryBuilder('hollyday')
            .where('hollyday.hollydayDate = :hollydayDate', { hollydayDate }).getOne()
    }
}

