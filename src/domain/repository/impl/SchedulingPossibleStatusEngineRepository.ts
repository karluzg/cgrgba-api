import { SchedulingPossibleStatus } from "../../model/SchedulingPossibleStatus";
import { SchedulingStatus } from "../../model/SchedulingStatus";
import { IPossibleStatusEngineRepository } from "../IPossibleStatusEngineRepository";


const myDataSource = require('../../../domain/meta-inf/data-source');
const SchedulingPossibleStatusRepository = myDataSource.getRepository(SchedulingPossibleStatus);

export class SchedulingPossibleStatusEngineImpl implements IPossibleStatusEngineRepository {

    async findNextStatus(schedulingStatus: SchedulingStatus): Promise<SchedulingStatus[]> {
        const queryBuilder = SchedulingPossibleStatusRepository.createQueryBuilder("SchedulingPossibleStatus")
            .select("s.nextStatus")
            .where("s.currentStatus = :status", { schedulingStatus });

        const result = await queryBuilder.getMany();
        return result.map((row) => row.nextStatus);
    }



}