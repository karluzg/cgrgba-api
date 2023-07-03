import { IPage } from "../../infrestructure/pageable-manager/IPage"
import { DirectionEnum } from "../../infrestructure/pageable-manager/enum/DirectionEnum"
import { Scheduling } from "../model/Scheduling"


export interface ISchedulingEngineRepository {

    findCitizenSchedulingInfo(citizenEmail: string): Promise<Scheduling[]>
    saveScheduling(scheduling: Scheduling): Promise<Scheduling>
    findBy(beginSchedulingDate: Date,
        endSchedulingDate: Date,
        isbeignDateDayEqualEndDateDay:boolean,
        categoryCode: string,
        serviceCode: string,
        schedulingStatus: string,
        orderColumn: string,
        direction: DirectionEnum,
        skip: number,
        pageNumber: number,
        pageSize: number): Promise<IPage<Scheduling>>

    findSchedulingById(schedulingId: number): Promise<Scheduling>
    findBeginDateAndHour(schedulingDate: string, chosenHour: string): Promise<Scheduling[]>
    findSchedulingCurrentDate(schedulingCurrentDate: string): Promise<Scheduling[]>
     getSchedulingStatistics(): Promise<{
        totalSchedulingDay: number;
        totalAttendScheduling: number;
        totalSchedulingCanceled: number;
        totalSchedulingForAnswering: number;
      }>

}