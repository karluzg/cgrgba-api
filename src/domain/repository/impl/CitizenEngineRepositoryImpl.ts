
import { Citizen } from "../../model/Citizen";
import { ICitizenEngineRepository } from "../ICitizenEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const citizenEngineRepository = myDataSource.getRepository(Citizen)

export class CitizenEngineRepositoryImpl implements ICitizenEngineRepository {



    async countEmailDuplicates(email: string): Promise<number> {
        return citizenEngineRepository.createQueryBuilder('citizen')
            .where("citizen.email = :email", { email: email })
            .getCount();


    }

    async countMobileNumberDuplicates(mobileNumber: string): Promise<number> {
        return await citizenEngineRepository
            .createQueryBuilder('citizen')
            .where("citizen.mobileNumber = :mobileNumber", { mobileNumber: mobileNumber })
            .getCount();


    }

    async findCitizenByEmailOrMobileNumber(citizenEmail: string, citizenMobileNumber: string): Promise<Citizen> {



        const query = citizenEngineRepository.createQueryBuilder('citizen')

        if (citizenEmail.length != 0) {
            query.where('citizen.email = :citizenEmail', { citizenEmail })
        }
        if (citizenMobileNumber.length != 0) {
            query.where('citizen.mobileNumber = :citizenMobileNumber', { citizenMobileNumber })
        }

        return await query.getOne();

    }

    async saveCitizenInfo(newCitizen: Citizen): Promise<Citizen> {
        return citizenEngineRepository.save(newCitizen)
    }

}

