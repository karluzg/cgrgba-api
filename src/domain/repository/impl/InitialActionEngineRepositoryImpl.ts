
import { InitialAction } from "../../model/InitialAction";
import { myDataSource } from "../../meta-inf/data-source";
import { IInitialActionEngineRespository } from "../IInitialActionEngineRepository";

export class InitialActionEngineRepositoryImpl implements IInitialActionEngineRespository {

    findByUserAndExecutedDateIsNull(userId: number): InitialAction[] {

        const initialActionList: InitialAction[] = []
        const initialActionRepository = myDataSource.getRepository(InitialAction)

        const initialActions = initialActionRepository.createQueryBuilder('initialAction')
            .where('initialAction.user.id = :userId', { user: userId })
            .andWhere('initialAction.executedDate is null')
            .getMany();

        //insert entity results from a query into an array
        initialActions.then((result) => {
            if (result != null) {
                result.forEach((initialAction) => {
                    initialActionList.push(initialAction);
                })
            }
        })

        return initialActionList;
    }

}



