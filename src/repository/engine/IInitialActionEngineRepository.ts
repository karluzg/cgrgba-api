import { InitialAction } from "../../domain-model/InitialAction";

export interface IInitialActionEngineRespository{
    findByUserAndExecutedDateIsNull(userId: number): InitialAction[];
}