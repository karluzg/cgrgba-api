import { injectable } from "tsyringe";
import { UserStatus } from "../../model/UserStatus";
import { IUserPossibleStatusEngneRepository } from "../IUserPossibleStatusEngineRepository";
import { UserPossibleStatus } from "../../model/UserPossibleStatus";

const myDataSource = require('../../../domain/meta-inf/data-source');
const schedulingstatusRepository = myDataSource.getRepository(UserPossibleStatus)

@injectable()
export class UserPossibleStatusEngineRepositoryImpl implements IUserPossibleStatusEngneRepository {


    async findUserNextStatus(userCurrentStatus: string): Promise<UserPossibleStatus[]> {

        const queryBuilder = schedulingstatusRepository.createQueryBuilder('userPossibleStatus')
            .leftJoinAndSelect("userPossibleStatus.nextStatus", "nextStatus")
            .leftJoinAndSelect("userPossibleStatus.currentStatus", "currentStatus")
            .where('currentStatus.code = :userCurrentStatus', { userCurrentStatus: userCurrentStatus });

        const possibeStatus = await queryBuilder.getMany();

        return possibeStatus;

    }
}