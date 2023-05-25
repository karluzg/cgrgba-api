import { SchedulingPossibleStatus } from "../../model/SchedulingPossibleStatus";
import { SchedulingStatus } from "../../model/SchedulingStatus";
import { ISchedulingPossibleStatusEngineRepository } from "../IPossibleStatusEngineRepository";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingPossibleStatusRepository = myDataSource.getRepository(SchedulingPossibleStatus);

export class SchedulingPossibleStatusEngineImpl implements ISchedulingPossibleStatusEngineRepository {

    async findNextStatus(schedulingStatus: SchedulingStatus): Promise<SchedulingStatus[]> {
        return await schedulingPossibleStatusRepository.createQueryBuilder('schedulingPossibleStatus')
            .select('schedulingPossibleStatus.nextStatus')
            .leftJoin('schedulingPossibleStatus.currentStatus', 'currentStatus')
            .where('currentStatus.code = :schedulingStatus', { schedulingStatus: schedulingStatus.code }).getMany();


    }




}