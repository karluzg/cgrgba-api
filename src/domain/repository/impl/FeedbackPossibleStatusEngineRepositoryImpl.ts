import { injectable } from "tsyringe";

import { IFeedbackPossibleStatusEngineRepository } from "../IFeedbackPossibleStatusEngineRepository";
import { FeedbackStatus } from "../../model/FeedbackStatus";
import { FeedbackPossibleStatus } from "../../model/FeedbackPossibleStatus";

const myDataSource = require('../../../domain/meta-inf/data-source');
const feedbackStatusRepository = myDataSource.getRepository(FeedbackPossibleStatus)

@injectable()
export class FeedbackPossibleStatusEngineRepositoryImpl implements IFeedbackPossibleStatusEngineRepository{
  
  async findFeedbackNextStatus(feedbackCurrentStatusCode: string): Promise<FeedbackPossibleStatus[]> {
 
    const queryBuilder = feedbackStatusRepository.createQueryBuilder('feedbackPossibleStatus')
      .leftJoinAndSelect('feedbackPossibleStatus.nextStatus', 'nextStatus')
      .leftJoinAndSelect('feedbackPossibleStatus.currentStatus', 'currentStatus')
      .where('currentStatus.code = :feedbackCurrentStatusCode', { feedbackCurrentStatusCode:feedbackCurrentStatusCode });
  
    const possibleStatuses = await queryBuilder.getMany();
  
    return possibleStatuses;
  }
  
    
}