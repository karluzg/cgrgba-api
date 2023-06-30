import { MessageTemplateContents } from "../model/MessageTemplateContents";
import { MessageTemplateFixedId } from "../model/enum/MessageTemplateFixedId";

export interface IMessageContentsEngineRepository {
    getMessageTemplateByFixedId(messageTemplateFixedId: MessageTemplateFixedId, languageCode: string):Promise<MessageTemplateContents>

}