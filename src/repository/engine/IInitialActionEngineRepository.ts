import { InitialAction } from "../../domain-model/user-manager/user/InitialAction";

export interface IInitialActionEngineRespository{
    findByUserAndExecutedDateIsNull(userId:number):Promise<InitialAction[] | null>
}