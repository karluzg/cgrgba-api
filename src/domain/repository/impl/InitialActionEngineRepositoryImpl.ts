
import { InitialAction } from "../../model/InitialAction";
const myDataSource = require('../../../domain/meta-inf/data-source');
import { plainToClass } from 'class-transformer';
import { IInitialActionEngineRespository } from "../IInitialActionEngineRepository";

export class InitialActionEngineRepositoryImpl implements IInitialActionEngineRespository {

    async findByUserAndExecutedDateIsNull(userId: number): Promise<InitialAction[]> {

    const initialActionRepository = myDataSource.getRepository(InitialAction)
    const initialActionList = await initialActionRepository.createQueryBuilder('initialAction')
        .leftJoinAndSelect("initialAction.user","user")
        .where('user.id = :userId', { userId: userId })
        .getMany();

    return initialActionList

       
    }
}


