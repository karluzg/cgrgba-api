import { Service } from "../model/Service";

export interface ISchedulingServiceEngineRepository {

    findService(serviceCode: string): Promise<Service>
}