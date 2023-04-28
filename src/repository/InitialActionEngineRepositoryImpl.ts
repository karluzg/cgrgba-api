
import { extend } from "lodash";
import { InitialAction } from "../domain-model/InitialAction";
import { myDataSource } from "../web-api/meta-inf/data-source";
import { IInitialActionEngineRespository } from "./engine/IInitialActionEngineRepository";

const initialActionRepository=  myDataSource.getRepository(InitialAction)

export class InitialActionEngineRepositoryImpl implements IInitialActionEngineRespository{
  
    async findByUserAndExecutedDateIsNull(userId: number): Promise<InitialAction[]> {
        return  await  initialActionRepository
        .createQueryBuilder('initialAction')
        .where('initialAction.user.id = :userId',{user:userId})
        .andWhere('initialAction.executedDate is null')
        .getMany()
        }
       
    }

   

