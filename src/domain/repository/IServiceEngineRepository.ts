import { Service } from "../model/Service";

export interface IServiceEngineRepository {
    findservice(serviceCode: string): Promise<Service>

}
