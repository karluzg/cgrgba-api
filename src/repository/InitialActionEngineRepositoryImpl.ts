
import { InitialAction } from "../domain-model/InitialAction";
import { myDataSource } from "../web-api/meta-inf/data-source";
import { IInitialActionEngineRespository } from "./engine/IInitialActionEngineRepository";

export class InitialActionEngineRepositoryImpl implements IInitialActionEngineRespository {

    async findByUserAndExecutedDateIsNull(userId: number): Promise<InitialAction[]> {

        const initialActionRepository = myDataSource.getRepository(InitialAction)

        return await initialActionRepository
            .createQueryBuilder('initialAction')
            .where('initialAction.user.id = :userId', { user: userId })
            .andWhere('initialAction.executedDate is null')
            .getMany()
    }

}



