import logger from "../../../infrestructure/config/logger";
import { MessageTemplateContents } from "../../model/MessageTemplateContents";
import { MessageTemplateFixedIdEnum } from "../../model/enum/MessageTemplateFixedIdEnum";
import { IMessageContentsEngineRepository } from "../../repository/IMessageContentsEngineRepository";

export class TemplateUtils {
   
   
    static async getTemplateText(
        messageEngineRepository: IMessageContentsEngineRepository,
        fields: Map<string, string>,
      messagemTemplateFixedId: MessageTemplateFixedIdEnum,
        languageCode: string
      ): Promise<string> {
        logger.info(
          "[TemplateUtils] Fetching template using template ID: %s and languageCode: %s",
          messagemTemplateFixedId,
          languageCode
        );
      
        const messageTemplateContents: MessageTemplateContents = await messageEngineRepository.getMessageTemplateByFixedId(
          messagemTemplateFixedId,
          languageCode
        );
      
        if (!messageTemplateContents) {
          logger.error(
            "[TemplateUtils] Unable to get contents for template ID: %s and languageCode: %s",
            messagemTemplateFixedId,
            languageCode
          );
        }
       
        logger.info("[TemplateUtils] Message template found: %s", messageTemplateContents.content); 
      
        const replacedTemplate: string = this.replaceTemplateVariables(messageTemplateContents.content, fields);
      
        return replacedTemplate;
      }
      
      static replaceTemplateVariables(bodyId: string, fields: Map<string, string>): string {
        let replacedTemplate: string = bodyId;
      
        for (const [variable, value] of fields.entries()) {
          const variableRegex = new RegExp(`{{${variable}}}`, 'g'); // 'g' for global search
          replacedTemplate = replacedTemplate.replace(variableRegex, value);
        }
      
        return replacedTemplate;
      }
      
        
}