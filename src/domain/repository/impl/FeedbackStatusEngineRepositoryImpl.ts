import { injectable } from "tsyringe";
import { FeedbackStatus } from "../../model/FeedbackStatus";
import { FeedbackStatusEnum } from "../../model/enum/FeedbackStatusEnum";
import { IFeedbackStatusEngineRepository } from "../IFeedbackStatusEngineRepository";

const myDataSource = require('../../../domain/meta-inf/data-source');
const feedbackStatusEngineRepository = myDataSource.getRepository(FeedbackStatus)

@injectable()
export class FeedbackStatusEngineRepositoryImpl implements IFeedbackStatusEngineRepository {

    async findFeedbackStatus(feedbackStatusCode: FeedbackStatusEnum): Promise<FeedbackStatus> {
        return await feedbackStatusEngineRepository.createQueryBuilder('feedbackStatus')
            .where('feedbackStatus.code = :feedbackStatusCode', { feedbackStatusCode })
            .getOne()

    }

}