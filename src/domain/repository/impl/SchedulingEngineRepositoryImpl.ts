

import { startOfDay, addDays } from 'date-fns';
import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { PageImpl } from "../../../infrestructure/pageable-manager/PageImpl";
import { DirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { Scheduling } from "../../model/Scheduling";
import { CategoryEnum } from "../../model/enum/CategoryEnum";
import { SchedulingStatusEnum } from "../../model/enum/SchedulingStatusEnum";
import { ServiceEnum } from "../../model/enum/ServiceEnum";
import { ISchedulingEngineRepository } from "../ISchedulingEngineRepository";
import { GetSchedulingListOperation } from "../../operation/scheduling-manager/scheduling/GetSchedulingListOperation";


const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingEngineRepository = myDataSource.getRepository(Scheduling)


export class SchedulingEngineRepositoryImpl implements ISchedulingEngineRepository {



  async findCitizenSchedulingInfo(citizenEmail: string): Promise<Scheduling[]> {
    return schedulingEngineRepository.createQueryBuilder('scheduling')
      .leftJoinAndSelect('scheduling.citizen', 'citizen')
      .leftJoinAndSelect('scheduling.service', 'service')
      .leftJoinAndSelect('scheduling.status', 'status')
      .where('citizen.email = :citizenEmail', { citizenEmail })
      .andWhere('status.description = :schedulingStatus', { schedulingStatus: SchedulingStatusEnum.FOR_ANSWERING })
      .getMany();
  }



  async saveScheduling(scheduling: Scheduling): Promise<Scheduling> {
    return await schedulingEngineRepository.save(scheduling);
  }

  async findBy(
    beginDate: Date,
    endDate: Date,
    isbeignDateDayEqualEndDateDay: boolean,
    categoryCode: CategoryEnum,
    serviceCode: ServiceEnum,
    schedulingStatus: SchedulingStatusEnum,
    defaultOrderColumn: string,
    direction: DirectionEnum,
    skip: number,
    pageNumber: number,
    pageSize: number
  ): Promise<IPage<Scheduling>> {
 
  
    const orderColumn = `scheduling.${defaultOrderColumn}`; // to avoid SQL Injection
  
    const query = schedulingEngineRepository.createQueryBuilder('scheduling')
      .leftJoinAndSelect("scheduling.status", "status")
      .leftJoinAndSelect("scheduling.service", "service")
      .leftJoinAndSelect("service.category", "category")


    if (!beginDate && !endDate && !serviceCode && !categoryCode && !schedulingStatus) {
      // No filters applied, return an empty page of results
      return new PageImpl<Scheduling>([], pageNumber, pageSize, 0, 0);
    }


    if (beginDate) {
      console.info("ENTROU Begin Date", beginDate);
      query.where('scheduling.year >= :beginDateYear', {
        beginDateYear: beginDate.getFullYear()
      })
        .andWhere('scheduling.month >= :beginDateMonth', {
          beginDateMonth: beginDate.getMonth() + 1
        })
        .andWhere('scheduling.day >= :beginDateDay', {
          beginDateDay: beginDate.getDate()
        })
        .andWhere('scheduling.year <= :endDateYear', {
          endDateYear: endDate.getFullYear()
        })
        .andWhere('scheduling.month <= :endDateMonth', {
          endDateMonth: endDate.getMonth() + 1
        })
        .andWhere('scheduling.day <= :endDateDay', {
          endDateDay: isbeignDateDayEqualEndDateDay ? beginDate.getDate() : endDate.getDate()
        });
    }
  
  
    if (serviceCode && categoryCode) {
    
      query.andWhere('(service.code LIKE :serviceCode OR category.code LIKE :categoryCode)', {
        serviceCode: `%${serviceCode}%`,
        categoryCode: `%${categoryCode}%`
      });
    }
  
    if (schedulingStatus && schedulingStatus !== SchedulingStatusEnum.REMOVED) {
      console.info("SCHEDULING STATUS");
      query.andWhere('status.code LIKE :schedulingStatus', { schedulingStatus: `%${schedulingStatus}%` });
    }



    query.orderBy(orderColumn, direction);
    const [items, totalItems] = await query
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();
    console.info("TOTAL ITEMS", totalItems);
  
    const totalPages = Math.ceil(totalItems / pageSize);
  
    console.log(query.getSql());
  
    return new PageImpl<Scheduling>(items, pageNumber, pageSize, totalItems, totalPages);
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

  async findBeginDateAndHour(schedulingDate: string, chosenHour: string): Promise<Scheduling[]> {

    return schedulingEngineRepository
      .createQueryBuilder('scheduling')
      .where('scheduling.chosenHour = :chosenHour', { chosenHour })
      .andWhere('scheduling.date = :schedulingDate', { schedulingDate })
      .getMany();
  }


  findSchedulingCurrentDate(schedulingCurrentDate: string): Promise<Scheduling[]> {
    return schedulingEngineRepository
      .createQueryBuilder('scheduling')
      .where('scheduling.date = :schedulingCurrentDate', { schedulingCurrentDate })
      .getMany();
  }


  async getSchedulingStatistics(): Promise<{
    totalSchedulingDay: number;
    totalAttendScheduling: number;
    totalSchedulingCanceled: number;
    totalSchedulingForAnswering: number;
  }> {

    const beginDate = startOfDay(new Date());
    const endDate = startOfDay(addDays(beginDate, 1));


    const query = schedulingEngineRepository.createQueryBuilder("scheduling")
  .leftJoin("scheduling.status", "status")
  .select("COUNT(scheduling.id)", "totalSchedulingDay")
  .addSelect("SUM(CASE WHEN status.description = :attendedStatus THEN 1 ELSE 0 END)", "totalAttendScheduling")
  .addSelect("SUM(CASE WHEN status.description = :canceledStatus THEN 1 ELSE 0 END)", "totalSchedulingCanceled")
  .addSelect("SUM(CASE WHEN status.description = :awaitingStatus THEN 1 ELSE 0 END)", "totalSchedulingForAnswering")
  .where("scheduling.year >= :beginDateYear", { beginDateYear: beginDate.getFullYear() })
  .andWhere("scheduling.month >= :beginDateMonth", { beginDateMonth: beginDate.getMonth() + 1 })
  .andWhere("scheduling.day >= :beginDateDay", { beginDateDay: beginDate.getDate() })
  .andWhere("scheduling.year <= :endDateYear", { endDateYear: endDate.getFullYear() })
  .andWhere("scheduling.month <= :endDateMonth", { endDateMonth: endDate.getMonth() + 1 })
  .andWhere("scheduling.day <= :endDateDay", { endDateDay: beginDate.getDate() })
  .setParameter("attendedStatus", SchedulingStatusEnum.ANSWERED)
  .setParameter("canceledStatus", SchedulingStatusEnum.CANCELED)
  .setParameter("awaitingStatus", SchedulingStatusEnum.FOR_ANSWERING);

const result = await query.getRawOne();

const schedulingStatistics = {
  totalSchedulingDay: parseInt(result.totalSchedulingDay, 10) || 0,
  totalAttendScheduling: parseInt(result.totalAttendScheduling, 10) || 0,
  totalSchedulingCanceled: parseInt(result.totalSchedulingCanceled, 10) || 0,
  totalSchedulingForAnswering: parseInt(result.totalSchedulingForAnswering, 10) || 0,
};


return schedulingStatistics;

  }


}


