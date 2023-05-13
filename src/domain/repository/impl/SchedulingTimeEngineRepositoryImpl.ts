
import { SchedulingTimeConfiguration } from "../../model/SchedulingTimeConfiguration";
import { ISchedulingTimeEngineRepository } from "../ISchedulingTimeEngineRepository";
import { injectable } from 'tsyringe'


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingTimeRepository = myDataSource.getRepository(SchedulingTimeConfiguration)

@injectable()
export class ISchedulingTimeEngineRepositoryImpl implements ISchedulingTimeEngineRepository {



    async findBySchedulingDate(schedulingBeginDate: Date): Promise<SchedulingTimeConfiguration> {

        return schedulingTimeRepository.createQueryBuilder('schedulingTimeConfiguration')
            .where('schedulingTimeConfiguration.beginDate = :schedulingBeginDate', { schedulingBeginDate: schedulingBeginDate }).getMany()
    }

    async saveSchedulingTime(schedulingTime: SchedulingTimeConfiguration): Promise<SchedulingTimeConfiguration> {

        return schedulingTimeRepository.save(schedulingTime)
    }

}


