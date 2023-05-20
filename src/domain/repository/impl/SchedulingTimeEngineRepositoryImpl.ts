
import { addDays, startOfDay } from "date-fns";
import { SchedulingTimeConfiguration } from "../../model/SchedulingTimeConfiguration";
import { ISchedulingTimeEngineRepository } from "../ISchedulingTimeEngineRepository";
import { injectable } from 'tsyringe'


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingTimeRepository = myDataSource.getRepository(SchedulingTimeConfiguration)

@injectable()
export class ISchedulingTimeEngineRepositoryImpl implements ISchedulingTimeEngineRepository {


    async findBySchedulingDate(beginDate: Date): Promise<SchedulingTimeConfiguration[]> {

        const beginCreationDate = startOfDay(beginDate);
        const endCreationDate = addDays(beginDate, 1);

        console.info("BEGINPUT IN DATE %", beginDate)
        console.info("BEGIN DATE %", beginCreationDate)
        console.info("END DATE %", endCreationDate)

        const schedulingTimeConfigurations = await schedulingTimeRepository.createQueryBuilder('schedulingTimeConfiguration')
            .leftJoinAndSelect('schedulingTimeConfiguration.hours', 'hours')
            .where('schedulingTimeConfiguration.beginDate >= :beginDate', { beginDate: beginCreationDate })
            .andWhere('schedulingTimeConfiguration.beginDate <= :endDate', { endDate: endCreationDate })
            .getMany();

        return schedulingTimeConfigurations;
    }


    async saveSchedulingTime(schedulingTime: SchedulingTimeConfiguration): Promise<SchedulingTimeConfiguration> {

        return schedulingTimeRepository.save(schedulingTime)
    }
}


