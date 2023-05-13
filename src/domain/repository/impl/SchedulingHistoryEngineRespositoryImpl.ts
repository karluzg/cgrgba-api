
import { injectable } from 'tsyringe'
import { ISchedulingHistoryEngineRepository as ISchedulingHistoryEngineRepository } from "../ISchedulingHistoryEngineRespository";
import { SchedulingHistory } from "../../model/SchedulingHistory";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingHistoryEngineRepository = myDataSource.getRepository(SchedulingHistory)

@injectable()
export class SchedulingHistoryEngineRepositoryImpl implements ISchedulingHistoryEngineRepository {

    updateSchedulingHistory(schedulingHistory: SchedulingHistory): Promise<void> {
        //TODO - Update this
        return schedulingHistoryEngineRepository.save(schedulingHistory)


    }


    async countNumberOfSchedulingByDateandHour(schedulingDate: string, chosenHour: string): Promise<SchedulingHistory[]> {

        return schedulingHistoryEngineRepository.createQueryBuilder('schedulingHistory')
            .leftJoinAndSelect("schedulingHistory.scheduling", "scheduling")
            .where('schedulingHistory.chosenHour = :chosenHour', { chosenHour: chosenHour })
            .andWhere('schedulingHistory.date = :schedulingDate', { schedulingDate: schedulingDate })
            .andWhere('scheduling.date = :schedulingDate', { schedulingDate: schedulingDate })
            .where('scheduling.chosenHour = :chosenHour', { chosenHour: chosenHour })
            .getMany();


    }

    async checkIfSchedulingHistoryExist(schedulingDate: string, chosenHour: string): Promise<boolean> {

        return schedulingHistoryEngineRepository
            .createQueryBuilder('schedulingHistory')
            .where('schedulingHistory.date = :schedulingDate', { schedulingDate })
            .andWhere('schedulingHistory.chosenHour = :chosenHour', { chosenHour })
            .andWhere('schedulingHistory.available = :available', { chosenHour })
            .getExists();

    }

    async saveSchedulingHistory(schedulingHistory: SchedulingHistory): Promise<void> {
        return schedulingHistoryEngineRepository.save(schedulingHistory)
    }



}


