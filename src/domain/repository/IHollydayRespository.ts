import { Hollyday } from "../model/Hollyday";

export interface IHollydayRespository {

    findByHollydayDate(hollydayDate: Date): Promise<Hollyday>

}