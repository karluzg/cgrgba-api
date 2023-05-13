
import { Scheduling } from "../../model/Scheduling";
import { ISchedulingEngineRepository } from "../ISchedulingEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingEngineRepository = myDataSource.getRepository(Scheduling)

export class SchedulingEngineRepositoryImpl implements ISchedulingEngineRepository {



    async saveScheduling(schedulingTime: Scheduling): Promise<Scheduling> {

        return schedulingEngineRepository.save(schedulingTime)
    }

    async valideSchedulingFeature(schedulingDate: string, chosenHour: string, citizenEmail: string, schedulingCategory: string, schedulingService: string): Promise<boolean> {

        return schedulingEngineRepository.createQueryBuilder('scheduling')
            .leftJoinAndSelect('scheduling.citizen', 'citizen')
            .where('citizen.email = :citizenEmail', { citizenEmail })
            .andWhere('scheduling.category = :schedulingCategory', { schedulingCategory })
            .andWhere('scheduling.service = :schedulingService', { schedulingService })
            .andWhere('scheduling.status = :schedulingStatus', { schedulingStatus: 'Por atender' })
            .orWhere('scheduling.date = :schedulingDate', { schedulingDate })
            .andWhere('scheduling.chosenHour = :chosenHour', { chosenHour }).getExists();


    }
}