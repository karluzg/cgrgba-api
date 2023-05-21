
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

    async blockDateAndHour(schedulingDate: string, chosenHour: string): Promise<void> {
        await schedulingHistoryEngineRepository
            .createQueryBuilder('schedulingHistory')
            .update(SchedulingHistory)
            .set({ available: false })
            .where('schedulingHistory.date = :schedulingDate', { schedulingDate })
            .andWhere('schedulingHistory.chosenHour = :chosenHour', { chosenHour })
            .execute();
    }


    async countNumberOfSchedulingByDateandHour(schedulingDate: string, chosenHour: string): Promise<SchedulingHistory[]> {
        return schedulingHistoryEngineRepository.createQueryBuilder('schedulingHistory')
            .leftJoinAndSelect('schedulingHistory.scheduling', 'scheduling')
            .where('schedulingHistory.chosenHour = :chosenHour', { chosenHour })
            .andWhere('schedulingHistory.date = :schedulingDate', { schedulingDate })
            .andWhere('scheduling.date = :schedulingDate AND scheduling.chosenHour = :chosenHour')
            .getMany();
    }


    async checkIfSchedulingHistoryExist(schedulingDate: string, chosenHour: string): Promise<boolean> {

        return schedulingHistoryEngineRepository
            .createQueryBuilder('schedulingHistory')
            .where('schedulingHistory.date = :schedulingDate', { schedulingDate })
            .andWhere('schedulingHistory.chosenHour = :chosenHour', { chosenHour })
            .andWhere('schedulingHistory.available = :available', { available: true })
            .getExists();

    }

    async save(schedulingHistory: SchedulingHistory): Promise<void> {
        return schedulingHistoryEngineRepository.save(schedulingHistory)
    }



}


