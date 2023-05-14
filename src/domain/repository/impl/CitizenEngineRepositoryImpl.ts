
import { Citizen } from "../../model/Citizen";
import { ICitizenEngineRepository } from "../ICitizenEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const citizenEngineRepository = myDataSource.getRepository(Citizen)

export class CitizenEngineRepositoryImpl implements ICitizenEngineRepository {

    async findCitizenByEmailOrMobileNumber(citizenEmail: string, citizenMobileNumber: string): Promise<Citizen> {



        const query = citizenEngineRepository.createQueryBuilder('citizen')

        if (citizenEmail.length != 0) {
            query.where('citizen.citizenEmail = :citizenEmail', { citizenEmail })
        }
        if (citizenMobileNumber.length != 0) {
            query.where('citizen.citizenMobileNumber = :citizenMobileNumber', { citizenMobileNumber })
        }

        return await query.getOne();

    }

    async saveCitizen(newCitizen: Citizen): Promise<Citizen> {
        return citizenEngineRepository.save(newCitizen)
    }

}

