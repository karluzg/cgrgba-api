import { injectable } from "tsyringe";
import { SchedulingPossibleStatus } from "../../model/SchedulingPossibleStatus";

import { ISchedulingPossibleStatusEngineRepository } from "../ISchedulingPossibleStatusEngineRepository";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingstatusRepository = myDataSource.getRepository(SchedulingPossibleStatus)


@injectable()
export class SchedulingPossibleStatusEngineRepositoryImpl implements ISchedulingPossibleStatusEngineRepository {


  async findSchedulingNextStatus(schedulingCurrentStatusCode: string): Promise<SchedulingPossibleStatus[]> {
  const queryBuilder = schedulingstatusRepository.createQueryBuilder('schedulingPossibleStatus')
    .leftJoinAndSelect("schedulingPossibleStatus.nextStatus", "nextStatus")
    .leftJoinAndSelect("schedulingPossibleStatus.currentStatus", "currentStatus")
    .where('currentStatus.code = :schedulingCurrentStatusCode', { schedulingCurrentStatusCode: schedulingCurrentStatusCode });

  const possibleStatus = await queryBuilder.getMany();

  return possibleStatus;
}

}