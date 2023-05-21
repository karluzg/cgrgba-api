import { Service } from "../../model/Service";
import { ISchedulingServiceEngineRepository } from "../ISchedulingServiceEngineRepository";


const myDataSource = require('../../../domain/meta-inf/data-source');

const schedulingServiceEngineRepository = myDataSource.getRepository(Service)

export class SchedulingServiceEngineRepositoryImpl implements ISchedulingServiceEngineRepository {
    findService(serviceCode: string): Promise<Service> {
        return schedulingServiceEngineRepository.createQueryBuilder('service')
            .leftJoinAndSelect("service.schedulingCategory", "schedulingCategory")
            .where('service.code = :serviceCode', { serviceCode })
            .getOne()
    }
}