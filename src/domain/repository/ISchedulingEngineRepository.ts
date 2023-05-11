import { Scheduling } from "../model/Scheduling"

export interface ISchedulingEngineRepository {

    valideSchedulingFeature(schedulingDate: string, chosenHour: string, citizenEmail: string, schedulingCategory: string, schedulingService: string): Promise<boolean>
    saveScheduling(schedulingTime: Scheduling): Promise<Scheduling>


}