import { injectable } from "tsyringe";
import { MessageTemplateFixedIdEnum } from "../../model/enum/MessageTemplateFixedIdEnum";
import { IMessageContentsEngineRepository } from "../IMessageContentsEngineRepository";
import { MessageTemplateContents } from "../../model/MessageTemplateContents";

const myDataSource = require('../../../domain/meta-inf/data-source');
const messageContentsEngineRepository = myDataSource.getRepository(MessageTemplateContents)


@injectable()
export class MessageContentsEngineRepositoryImpl implements IMessageContentsEngineRepository {
  async getMessageTemplateByFixedId(
    messageTemplateFixedId: MessageTemplateFixedIdEnum,
    languageCode: string
  ): Promise<MessageTemplateContents> {
      
    return await messageContentsEngineRepository
      .createQueryBuilder('messageTemplateContents')
      .leftJoinAndSelect('messageTemplateContents.messageTemplate', 'messageTemplate')
      .leftJoinAndSelect('messageTemplateContents.languageCode', 'languageCode')
      .select(['messageTemplateContents', 'messageTemplateContents.content']) // Include 'content' in the select query
      .where('messageTemplate.code = :messageTemplateFixedId', { messageTemplateFixedId })
      .andWhere('languageCode.code = :languageCode', { languageCode })
      .getOne();
  }
}
