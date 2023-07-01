import { MessageTemplateContents } from "../model/MessageTemplateContents";
import { MessageTemplateFixedIdEnum } from "../model/enum/MessageTemplateFixedIdEnum";

export interface IMessageContentsEngineRepository {
    getMessageTemplateByFixedId(messageTemplateFixedId: MessageTemplateFixedIdEnum, languageCode: string): Promise<MessageTemplateContents>

}