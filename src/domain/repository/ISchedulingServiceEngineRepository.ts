import { Service } from "../model/Service";

export interface ISchedulingServiceEngineRepository {

    findServiceByCategory(serviceCode: string): Promise<Service>
}