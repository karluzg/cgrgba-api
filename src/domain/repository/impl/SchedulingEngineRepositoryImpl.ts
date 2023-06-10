

import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { PageImpl } from "../../../infrestructure/pageable-manager/PageImpl";
import { DirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { Scheduling } from "../../model/Scheduling";
import { SchedulingStatusEnum } from "../../model/enum/SchedulingStatusEnum";
import { ISchedulingEngineRepository } from "../ISchedulingEngineRepository";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingEngineRepository = myDataSource.getRepository(Scheduling)


export class SchedulingEngineRepositoryImpl implements ISchedulingEngineRepository {

    async findBeginDateAndHour(schedulingDate: string, chosenHour: string): Promise<Scheduling[]> {

        return schedulingEngineRepository
            .createQueryBuilder('scheduling')
            .where('scheduling.chosenHour = :chosenHour', { chosenHour })
            .andWhere('scheduling.date = :schedulingDate', { schedulingDate })
            .getMany();
    }


    async saveScheduling(scheduling: Scheduling): Promise<Scheduling> {
        return await schedulingEngineRepository.save(scheduling);
    }




    async findSchedulingById(schedulingId: number): Promise<Scheduling> {
        return schedulingEngineRepository
            .createQueryBuilder('scheduling')
            .leftJoinAndSelect('scheduling.citizen', 'citizen')
            .leftJoinAndSelect('scheduling.service', 'service')
            .leftJoinAndSelect('service.category', 'category')
            .leftJoinAndSelect('scheduling.status', 'status')
            .andWhere('scheduling.id = :schedulingId', { schedulingId: schedulingId })
            .getOne();
    }


    async findBy(
        beginDate: Date,
        endDate: Date,
        schedulingStatus: SchedulingStatusEnum,
        defaultorderColumn: string,
        direction: DirectionEnum,
        skip: number,
        pageNumber: number,
        pageSize: number
    ): Promise<IPage<Scheduling>> {



        console.info("BEGIN DATE TO BE USE IN QUERY", beginDate)
        console.info("END DATE TO BE USE IN QUERY", endDate)


        const orderColumn = `scheduling.${defaultorderColumn}`; // to avoid SQL Injection
        const query = schedulingEngineRepository.createQueryBuilder('scheduling');


        query.orderBy(orderColumn, direction);

        query.where('scheduling.searchDate >= :beginDate AND scheduling.searchDate <= :endDate', {
            beginDate,
            endDate
        });

        if (schedulingStatus !== SchedulingStatusEnum.REMOVED) {
            query.andWhere('scheduling.status LIKE :schedulingStatus', { schedulingStatus: `%${schedulingStatus}%` });
        }

        const [items, totalItems] = await query
            .skip(skip)
            .take(pageSize)
            .getManyAndCount();

        const totalPages = Math.ceil(totalItems / pageSize);

        console.log(query.getSql());

        return new PageImpl<Scheduling>(items, pageNumber, pageSize, totalItems, totalPages);


    }



    async findCitizenSchedulingInfo(citizenEmail: string): Promise<Scheduling[]> {
        return schedulingEngineRepository.createQueryBuilder('scheduling')
            .leftJoinAndSelect('scheduling.citizen', 'citizen')
            .leftJoinAndSelect('scheduling.service', 'service')
            .leftJoinAndSelect('scheduling.status', 'status')
            .where('citizen.email = :citizenEmail', { citizenEmail })
            .andWhere('status.description = :schedulingStatus', { schedulingStatus: SchedulingStatusEnum.FOR_ANSWERING })
            .getMany();
    }


}