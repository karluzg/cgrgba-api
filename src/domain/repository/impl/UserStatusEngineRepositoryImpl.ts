import { injectable } from "tsyringe";
import { UserStatus } from "../../model/UserStatus";
import { IUserStatusEngineRepository } from "../IUserStatusEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const userStatusEngineRepository = myDataSource.getRepository(UserStatus)

@injectable()
export class UserStatusEngineRepositoryImpl implements IUserStatusEngineRepository {
    async findStatusCode(statusCode: string): Promise<UserStatus> {

        return userStatusEngineRepository.createQueryBuilder('UserStatus')
            .where('UserStatus.code = :statusCode', { statusCode })
            .getOne()

    }
    async save(userStatus: UserStatus): Promise<void> {
        return await userStatusEngineRepository.save(userStatus);
    }

}