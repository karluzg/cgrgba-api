import { injectable } from "tsyringe";
import { SchedulingPossibleStatus } from "../../model/SchedulingPossibleStatus";

import { ISchedulingPossibleStatusEngineRepository } from "../ISchedulingPossibleStatusEngineRepository";
import { result } from "lodash";

const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingstatusRepository = myDataSource.getRepository(SchedulingPossibleStatus)


@injectable()
export class SchedulingPossibleStatusEngineRepositoryImpl implements ISchedulingPossibleStatusEngineRepository {


    async findSchedulingNextStatus(schedulingCurrentStatus: string): Promise<SchedulingPossibleStatus[]> {
        const queryBuilder = schedulingstatusRepository.createQueryBuilder('schedulingPossibleStatus')
            .leftJoinAndSelect("schedulingPossibleStatus.nextStatus", "nextStatus")
            .leftJoinAndSelect("schedulingPossibleStatus.currentStatus", "currentStatus")
            .where('currentStatus.code = :schedulingStatus', { schedulingStatus: schedulingCurrentStatus });

        const possibeStatus = await queryBuilder.getMany();

        return possibeStatus.map(result => result.nextStatus);
    }

}