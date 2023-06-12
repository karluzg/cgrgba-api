import { SchedulingStatusEnum } from "../../model/enum/SchedulingStatusEnum";
import { SchedulingStatus } from "../../model/SchedulingStatus";
import { ISchedulinStatusEngineRepository } from "../ISchedulinStatusEngineRepository";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingStatusEngineRepository = myDataSource.getRepository(SchedulingStatus)


export class SchedulinStatusEngineRepositoryImpl implements ISchedulinStatusEngineRepository {

    async findSchedulingStatus(schedulingStatusCode: SchedulingStatusEnum): Promise<SchedulingStatus> {
        return await schedulingStatusEngineRepository.createQueryBuilder('schedulingStatus')
            .where('schedulingStatus.code = :schedulingStatusCode', { schedulingStatusCode })
            .getOne()

    }
}

