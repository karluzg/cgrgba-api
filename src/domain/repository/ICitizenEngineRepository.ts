import { Citizen } from "../model/Citizen";

export interface ICitizenEngineRepository {
    findCitizenByEmailOrMobileNumber(citizenEmail: string, citizenMobileNumber: string): Promise<Citizen>;
    saveCitizen(newCitizen: Citizen): Promise<Citizen>
}