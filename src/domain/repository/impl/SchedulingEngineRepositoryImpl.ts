

import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { PageImpl } from "../../../infrestructure/pageable-manager/PageImpl";
import { DirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { Scheduling } from "../../model/Scheduling";
import { SchedulingStatus } from "../../model/SchedulingStatus";
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


    async updateScheduling(scheduling: Scheduling): Promise<Scheduling> {
        return await schedulingEngineRepository.save(scheduling);
    }





    async findSchedulingById(schedulingId: number): Promise<Scheduling> {

        return schedulingEngineRepository.createQueryBuilder('scheduling')
            .leftJoinAndSelect('scheduling.citizen', 'citizen')
            .leftJoinAndSelect('scheduling.service', 'service')
            .leftJoinAndSelect('service.category', 'category')
            .leftJoinAndSelect('scheduling.status', 'status')
            .where('scheduling.id = :schedulingId', { schedulingId })
            .getOne();
    }



    async findBy(
        beginDate: Date,
        endDate: Date,
        beginSchedulingTime: number,
        endSchedulingTime: number,
        beginSchedulingMinute: number,
        endSchedulingMinute: number,
        schedulingStatus: string,
        defaultorderColumn: string,
        direction: DirectionEnum,
        skip: number,
        pageNumber: number,
        pageSize: number
    ): Promise<IPage<Scheduling>> {





        const orderColumn = `scheduling.${defaultorderColumn}`; // to avoid SQL Injection
        const query = schedulingEngineRepository.createQueryBuilder('scheduling');


        query.orderBy(orderColumn, direction);

        query.where('DATE(scheduling.creationDate) >= DATE(:beginDate) AND DATE(scheduling.creationDate) <= DATE(:endDate)', {
            beginDate,
            endDate
        });


        if (beginSchedulingTime !== undefined) {
            query.andWhere('scheduling.hour >= :beginSchedulingTime', { beginSchedulingTime });
        }

        if (endSchedulingTime !== undefined) {
            query.andWhere('scheduling.hour <= :endSchedulingTime', { endSchedulingTime });
        }

        if (beginSchedulingMinute !== undefined) {
            query.andWhere('scheduling.minute >= :beginSchedulingMinute', { beginSchedulingMinute });
        }

        if (endSchedulingMinute !== undefined) {
            query.andWhere('scheduling.minute <= :endSchedulingMinute', { endSchedulingMinute });
        }

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