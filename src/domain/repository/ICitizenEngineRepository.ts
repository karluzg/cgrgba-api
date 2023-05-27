import { Citizen } from "../model/Citizen";

export interface ICitizenEngineRepository {
    findCitizenByEmailOrMobileNumber(citizenEmail: string, citizenMobileNumber: string): Promise<Citizen>;
    saveCitizenInfo(newCitizen: Citizen): Promise<Citizen>
    countEmailDuplicates(email: string): Promise<number>
    countMobileNumberDuplicates(mobileNumber: string): Promise<number>

}