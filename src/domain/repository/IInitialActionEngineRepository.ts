import { InitialAction } from "../model/InitialAction";

export interface IInitialActionEngineRespository{
    findByUserAndExecutedDateIsNull(userId: number): Promise< InitialAction[]>;
}