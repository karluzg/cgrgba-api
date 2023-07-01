
import { EmailMessageTemplate } from "../../../infrestructure/template/EmailMessageTemplate";
import { MessageTemplateFixedId } from "../../model/enum/MessageTemplateFixedId";
import { IMessageContentsEngineRepository } from "../../repository/IMessageContentsEngineRepository";
import { TemplateUtils } from "./TemplateUtils";
import { SchedulingTimeUtil } from "./SchedulingTimeUtil";


export class EmailNotification {

  public static async sendUserNotification(userFullName: string, email: string, password: string, baseEndpoint: string,
    emailContact: string,
    messageContsEngineRepository: IMessageContentsEngineRepository,
    subjectId: MessageTemplateFixedId,
    bodyId: MessageTemplateFixedId,
    languageCode: string): Promise<EmailMessageTemplate> {

    const fields: Map<string, string> = new Map();

    const subject: string = await TemplateUtils.getTemplateText(messageContsEngineRepository, fields, subjectId, languageCode)

    fields.set('USER_FULL_NAME', userFullName);
    fields.set('EMAIL', email);
    fields.set('PASSWORD', password);
    fields.set('EMAIL_CONTACT', emailContact);
    fields.set('BASE_ENDPOINT', baseEndpoint);

    const greeting: string = await SchedulingTimeUtil.getGreet()
    fields.set('GREETING', greeting);

    const body: string = await TemplateUtils.getTemplateText(messageContsEngineRepository, fields, bodyId, languageCode)

    return new EmailMessageTemplate(subject, body);

  }

  public static async sendSchedulingNotification(citizenName: string,
        schedulingDate: string,
        schedulingHour: string,
        service: string,
        baseEndpoint: string,
        messageContsEngineRepository: IMessageContentsEngineRepository,
        subjectId: MessageTemplateFixedId,
        bodyId: MessageTemplateFixedId,
        languageCode: string): Promise<EmailMessageTemplate> {


        const fields: Map<string, string> = new Map();

        const subject: string = await TemplateUtils.getTemplateText(messageContsEngineRepository, fields, subjectId, languageCode)

        fields.set('CITIZEN_NAME', citizenName);
        fields.set('SCHEDULING_DATE', schedulingDate);
        fields.set('SCHEDULING_HOUR', schedulingHour);
        fields.set('SCHEDULING_SERVICE', service);
        fields.set('BASE_ENDPOINT', baseEndpoint);

        const greeting: string = await SchedulingTimeUtil.getGreet()
        fields.set('GREETING', greeting);

        const body: string = await TemplateUtils.getTemplateText(messageContsEngineRepository, fields, bodyId, languageCode)

        return new EmailMessageTemplate(subject, body);

    }




}