import { UserStatus } from "../../model/UserStatus";
import { IUserStatusEngineRepository } from "../IUserStatusEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const userStatusEngineRepository = myDataSource.getRepository(UserStatus)

export class UserStatusEngineRepositoryImpl implements IUserStatusEngineRepository {
    async findStatusCode(statusCode: string): Promise<UserStatus> {

        return userStatusEngineRepository.createQueryBuilder('UserStatus')
            .where('UserStatus.description = :statusCode', { statusCode })
            .getOne()

    }
    async save(userStatus: UserStatus): Promise<void> {
        return await userStatusEngineRepository.save(userStatus);
    }

}