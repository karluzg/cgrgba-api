
import { injectable } from "tsyringe";
import { Hollyday } from "../../model/Hollyday";
import { IHollydayEngineRepository as IHollydayEngineRepository } from "../IHollydayEngineRepository";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingHollydayRepository = myDataSource.getRepository(Hollyday)
@injectable()
export class HollydayEngineRepositoryImpl implements IHollydayEngineRepository {

    async findByHollydayDate(hollydayDate: Date): Promise<Hollyday> {

        return schedulingHollydayRepository.createQueryBuilder('hollyday')
            .where('hollyday.date = :hollydayDate', { hollydayDate }).getOne()
    }
}

