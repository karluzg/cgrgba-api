
import { EncryptTemplate } from "../../../infrestructure/template/EncryptTemplate";
import { Citizen } from "../../model/Citizen";
import { ICitizenEngineRepository } from "../ICitizenEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const citizenEngineRepository = myDataSource.getRepository(Citizen)

export class CitizenEngineRepositoryImpl implements ICitizenEngineRepository {



    async countEmailDuplicates(email: string): Promise<number> {
        return citizenEngineRepository.createQueryBuilder('citizen')
            .where("citizen.email = :email", { email: EncryptTemplate.encryptColumn(email) })
            .getCount();


    }

    async countMobileNumberDuplicates(mobileNumber: string): Promise<number> {
        return await citizenEngineRepository
            .createQueryBuilder('citizen')
            .where("citizen.mobileNumber = :mobileNumber", { mobileNumber: EncryptTemplate.encryptColumn(mobileNumber) })
            .getCount();


    }

    async findCitizenByEmailOrMobileNumber(citizenEmail: string, citizenMobileNumber: string): Promise<Citizen> {


        const query = citizenEngineRepository.createQueryBuilder('citizen');

        if (citizenEmail?.length !== 0) {
            query.where('citizen.email = :citizenEmail', { citizenEmail: EncryptTemplate.encryptColumn(citizenEmail) });
        }
        if (citizenMobileNumber?.length !== 0) {
            query.orWhere('citizen.mobileNumber = :citizenMobileNumber', { citizenMobileNumber: EncryptTemplate.encryptColumn(citizenMobileNumber) });
        }

        return await query.getOne();

    }

    async saveCitizenInfo(newCitizen: Citizen): Promise<Citizen> {
        return citizenEngineRepository.save(newCitizen)
    }

}

