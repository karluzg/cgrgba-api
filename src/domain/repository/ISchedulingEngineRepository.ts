import { IPage } from "../../infrestructure/pageable-manager/IPage"
import { DirectionEnum } from "../../infrestructure/pageable-manager/enum/DirectionEnum"
import { Scheduling } from "../model/Scheduling"

export interface ISchedulingEngineRepository {

    findCitizenSchedulingInfo(citizenEmail: string): Promise<Scheduling[]>
    saveScheduling(scheduling: Scheduling): Promise<Scheduling>
    findBy(beginSchedulingDate: Date,
        endSchedulingDate: Date,
        beginSchedulingTime: number,
        endSchedulingTime: number,
        beginSchedulingMinute: number,
        endSchedulingMinute: number,
        schedulingStatus: string,
        orderColumn: string,
        direction: DirectionEnum,
        skip: number,
        pageNumber: number,
        pageSize: number): Promise<IPage<Scheduling>>

    findSchedulingById(schedulingId: number): Promise<Scheduling>
    updateScheduling(scheduling: Scheduling): Promise<void>
    findBeginDateAndHour(schedulingDate: string, chosenHour: string): Promise<Scheduling[]>

}