import { Service } from "../../model/Service";
import { IServiceEngineRepository } from "../IServiceEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const serviceEngineRepository = myDataSource.getRepository(Service)

export class ServiceEngineRepositoryImpl implements IServiceEngineRepository {
    async findservice(serviceCode: string): Promise<Service> {
        return await serviceEngineRepository.findOneOrFail(serviceCode);
    }

}