
import { IsNull } from "typeorm";
import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { PageImpl } from "../../../infrestructure/pageable-manager/PageImpl";
import { DirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { Scheduling } from "../../model/Scheduling";
import { SchedulingStatusEnum } from "../../model/enum/SchedulingStatusEnum";
import { ISchedulingEngineRepository } from "../ISchedulingEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingEngineRepository = myDataSource.getRepository(Scheduling)

export class SchedulingEngineRepositoryImpl implements ISchedulingEngineRepository {


    async findBy(
        beginSchedulingDate: Date,
        endSchedulingDate: Date,
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





        console.info("BEGIN DATE:" + beginSchedulingDate)
        console.info("BEGIN DATE:" + endSchedulingDate)

        const orderColumn = `scheduling.${defaultorderColumn}`; // to avoid SQL Injection

        const query = schedulingEngineRepository.createQueryBuilder('scheduling');

        query.orderBy(orderColumn, direction);

        query.where('scheduling.creationDate >= :beginSchedulingDate', { beginSchedulingDate });
        query.andWhere('scheduling.creationDate <= :endSchedulingDate', { endSchedulingDate });



        if (typeof beginSchedulingTime !== 'undefined') {
            query.andWhere('scheduling.hour >= :beginSchedulingTime', { beginSchedulingTime });

        }

        if (typeof endSchedulingTime !== 'undefined') {
            query.andWhere('scheduling.hour <= :endSchedulingTime', { endSchedulingTime });
        }

        if (typeof endSchedulingTime !== 'undefined') {
            query.andWhere('scheduling.minute >= :beginSchedulingMinute', { beginSchedulingMinute });
        }

        if (typeof endSchedulingTime !== 'undefined') {
            query.andWhere('scheduling.minute <= :endSchedulingMinute', { endSchedulingMinute });
        }

        if (schedulingStatus != SchedulingStatusEnum.REMOVED) {
            query.andWhere('scheduling.status LIKE :schedulingStatus', { schedulingStatus: `%${schedulingStatus}%` });

        }


        const [items, totalItems] = await query
            .skip(skip)
            .take(pageSize)
            .getManyAndCount();


        const totalPages = Math.ceil(totalItems / pageSize);

        return new PageImpl<Scheduling>(items, pageNumber, pageSize, totalItems, totalPages);
    }

    async saveScheduling(schedulingTime: Scheduling): Promise<Scheduling> {

        return await schedulingEngineRepository.save(schedulingTime)
    }

    async findCitizenSchedulingInfo(citizenEmail: string): Promise<Scheduling[]> {
        return schedulingEngineRepository.createQueryBuilder('scheduling')
            .leftJoinAndSelect('scheduling.citizen', 'citizen')
            .where('citizen.email = :citizenEmail', { citizenEmail })
            .andWhere('scheduling.status = :schedulingStatus', { schedulingStatus: SchedulingStatusEnum.FOR_ANSWERING })
            .getMany();
    }

}