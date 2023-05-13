import { Citizen } from "../../model/Citizen";
import { ICitizenEngineRepository } from "../ICitizenEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const citizenEngineRepository = myDataSource.getRepository(Citizen)

export class CitizenEngineRepositoryImpl implements ICitizenEngineRepository {

    async findCitizenByEmail(citizenEmail: string): Promise<Citizen> {
        return citizenEngineRepository.createQueryBuilder('citizen')
            .where('citizen.email = :citizenEmail', { citizenEmail: citizenEmail }).getOne()
    }

    async saveCitizen(newCitizen: Citizen): Promise<Citizen> {
        return citizenEngineRepository.save(newCitizen)
    }

}

