
import { injectable } from 'tsyringe'
import { ISchedulingHistoryEngineRepository as ISchedulingHistoryEngineRepository } from "../ISchedulingHistoryEngineRespository";
import { SchedulingHistory } from "../../model/SchedulingHistory";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingHistoryEngineRepository = myDataSource.getRepository(SchedulingHistory)

@injectable()
export class SchedulingHistoryEngineRepositoryImpl implements ISchedulingHistoryEngineRepository {


    async findSchedulingById(schedulingId: number): Promise<SchedulingHistory> {
        const schedulingHistory = await schedulingHistoryEngineRepository
            .createQueryBuilder('schedulingHistory')
            .leftJoinAndSelect('schedulingHistory.scheduling', 'scheduling')
            .where('scheduling.id = :schedulingId', { schedulingId })
            .getOne();

        return schedulingHistory;
    }



    async checkIfSchedulingHistoryExist(schedulingDate: string, chosenHour: string): Promise<boolean> {

        return schedulingHistoryEngineRepository
            .createQueryBuilder('schedulingHistory')
            .where('schedulingHistory.date = :schedulingDate', { schedulingDate })
            .andWhere('schedulingHistory.chosenHour = :chosenHour', { chosenHour })
            .andWhere('schedulingHistory.available = :available', { available: false })
            .getExists();

    }

    async save(schedulingHistory: SchedulingHistory): Promise<void> {
        return schedulingHistoryEngineRepository.save(schedulingHistory)
    }



}


