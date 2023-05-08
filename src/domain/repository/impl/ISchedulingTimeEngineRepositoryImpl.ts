
import { SchedulingTime } from "../../model/SchedulingTime";
import { ISchedulingTimeEngineRepository } from "../ISchedulingTimeEngineRepository";
import { injectable } from 'tsyringe'


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingTimeRepository = myDataSource.getRepository(SchedulingTime)

@injectable()
export class ISchedulingTimeEngineRepositoryImpl implements ISchedulingTimeEngineRepository {

    async findBySchedulingDate(schedulingBeginDate: Date): Promise<SchedulingTime> {

        return await schedulingTimeRepository.createQueryBuilder('schedulingTime')
            .where('schedulingTime.schedulingBeginDate = :schedulingBeginDate', { schedulingBeginDate: schedulingBeginDate }).getOne()
    }

    async saveSchedulingTime(schedulingTime: SchedulingTime): Promise<SchedulingTime> {

        return await schedulingTimeRepository.save(schedulingTime)
    }

}


