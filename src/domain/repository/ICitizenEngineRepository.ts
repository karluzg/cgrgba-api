import { Citizen } from "../model/Citizen";

export interface ICitizenEngineRepository {
    findCitizenByEmail(citizenEmail: string): Promise<Citizen>;
    saveCitizen(newCitizen: Citizen): Promise<Citizen>
}