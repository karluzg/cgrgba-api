import { injectable } from "tsyringe";
import { FeedbackPossibleStatus } from "../../model/FeedbackPossibleStatus";
import { IFeedbackPossibleStatusEngineRepository } from "../IFeedbackPossibleStatusEngineRepository";
import { FeedbackStatus } from "../../model/FeedbackStatus";

const myDataSource = require('../../../domain/meta-inf/data-source');
const feedbackStatusRepository = myDataSource.getRepository(FeedbackStatus)

@injectable()
export class FeedbackPossibleStatusEngineRepositoryImpl implements IFeedbackPossibleStatusEngineRepository{
  
  async  findFeedbackNextStatus(feedbackCurrentStatusCode: string): Promise<FeedbackPossibleStatus[]> {
    const queryBuilder = feedbackStatusRepository.createQueryBuilder('feedbackPossibleStatus')
    .leftJoinAndSelect("feedbackPossibleStatus.nextStatus", "nextStatus")
    .leftJoinAndSelect("feedbackPossibleStatus.currentStatus", "currentStatus")
    .where('currentStatus.code = :feedbackCurrentStatusCode', { feedbackCurrentStatusCode: feedbackCurrentStatusCode });

      const possibleStatus = await queryBuilder.getMany();
      
      return possibleStatus;
    }
    
}