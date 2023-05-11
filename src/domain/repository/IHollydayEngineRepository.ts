import { Hollyday } from "../model/Hollyday";

export interface IHollydayEngineRepository {

    findByHollydayDate(hollydayDate: Date): Promise<Hollyday>

}