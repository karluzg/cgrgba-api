import { injectable } from "tsyringe";
import { FeedbackMessageType } from "../../model/MessageType";
import { IFeedbackMessageTypeEngineRepository } from "../IFeedbackMessageTypeEngineRepository";
import { FeedbackTypeEnum } from "../../model/enum/FeedbackTypeEnum";
const myDataSource = require('../../../domain/meta-inf/data-source');
const feedbackMessaTypeEngineRepository = myDataSource.getRepository(FeedbackMessageType)

@injectable()
export class FeedbackMessageTypeEngineRepositoryImpl implements IFeedbackMessageTypeEngineRepository{
 
  async  getAllFeedbackMessageType(): Promise<FeedbackMessageType[]> {
    return await feedbackMessaTypeEngineRepository.createQueryBuilder('feedbackMessageType').getMany();
    }

    async getFeedbackMessageByType(feedbabckMessageTypeCode:FeedbackTypeEnum): Promise<FeedbackMessageType> {
        return await feedbackMessaTypeEngineRepository.createQueryBuilder('feedbackMessageType')
            .where('feedbackMessageType.code=:feedbabckMessageTypeCode',{feedbabckMessageTypeCode})
            .getOne();
    }
    
}