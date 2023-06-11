

import e, { query } from "express";
import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { PageImpl } from "../../../infrestructure/pageable-manager/PageImpl";
import { DirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { Scheduling } from "../../model/Scheduling";
import { CategoryEnum } from "../../model/enum/CategoryEnum";
import { SchedulingStatusEnum } from "../../model/enum/SchedulingStatusEnum";
import { ServiceEnum } from "../../model/enum/ServiceEnum";
import { ISchedulingEngineRepository } from "../ISchedulingEngineRepository";


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
    categoryCode: CategoryEnum,
    serviceCode: ServiceEnum,
    schedulingStatus: SchedulingStatusEnum,
    defaultOrderColumn: string,
    direction: DirectionEnum,
    skip: number,
    pageNumber: number,
    pageSize: number
  ): Promise<IPage<Scheduling>> {
    console.info("Begin Date", beginDate);
    console.info("End Date", endDate);
  
    const orderColumn = `scheduling.${defaultOrderColumn}`; // to avoid SQL Injection
  
    const query = schedulingEngineRepository.createQueryBuilder('scheduling')
      .leftJoinAndSelect("scheduling.status", "status")
      .leftJoinAndSelect("scheduling.service", "service")
      .leftJoinAndSelect("service.category", "category")
      .orderBy(orderColumn, direction);
  
    if ((beginDate && endDate) || ((beginDate && !endDate))) {
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
          endDateDay: endDate.getDate()
        });
    }
  
    if (serviceCode && categoryCode) {
      console.info("ENTROU SERVICE CODE", beginDate);
      query.andWhere('(service.code LIKE :serviceCode OR category.code LIKE :categoryCode)', {
        serviceCode: `%${serviceCode}%`,
        categoryCode: `%${categoryCode}%`
      });
    }
  
    if (schedulingStatus && schedulingStatus !== SchedulingStatusEnum.REMOVED) {
      console.info("SCHEDULING STATUS");
      query.andWhere('status.code LIKE :schedulingStatus', { schedulingStatus: `%${schedulingStatus}%` });
    }
  
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




}