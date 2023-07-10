
import { EmailMessageTemplate } from "../../../infrestructure/template/EmailMessageTemplate";
import { MessageTemplateFixedIdEnum } from "../../model/enum/MessageTemplateFixedIdEnum";
import { IMessageContentsEngineRepository } from "../../repository/IMessageContentsEngineRepository";
import { TemplateUtils } from "./TemplateUtils";
import { TimeUtil } from "./TimeUtil";


export class EmailNotification {

  public static async sendUserNotification(userFullName: string, email: string, password: string, baseEndpoint: string,
    emailContact: string,
    messageContsEngineRepository: IMessageContentsEngineRepository,
    subjectId: MessageTemplateFixedIdEnum,
    bodyId: MessageTemplateFixedIdEnum,
    languageCode: string): Promise<EmailMessageTemplate> {

    const fields: Map<string, string> = new Map();

    const subject: string = await TemplateUtils.getTemplateText(messageContsEngineRepository, fields, subjectId, languageCode)

    fields.set('USER_FULL_NAME', userFullName);
    fields.set('EMAIL', email);
    fields.set('PASSWORD', password);
    fields.set('EMAIL_CONTACT', emailContact);
    fields.set('BASE_ENDPOINT', baseEndpoint);

    const greeting: string = await TimeUtil.getGreet()
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
    subjectId: MessageTemplateFixedIdEnum,
    bodyId: MessageTemplateFixedIdEnum,
        languageCode: string): Promise<EmailMessageTemplate> {


        const fields: Map<string, string> = new Map();

    const subject: string = await TemplateUtils.getTemplateText(messageContsEngineRepository, fields, subjectId, languageCode)

    const newOutputDate:string=await TimeUtil.formatDate(schedulingDate);

        fields.set('CITIZEN_NAME', citizenName);
        fields.set('SCHEDULING_DATE', newOutputDate);
        fields.set('SCHEDULING_HOUR', schedulingHour);
        fields.set('SCHEDULING_SERVICE', service);
        fields.set('BASE_ENDPOINT', baseEndpoint);

    const greeting: string = await TimeUtil.getGreet()
        fields.set('GREETING', greeting);

        const body: string = await TemplateUtils.getTemplateText(messageContsEngineRepository, fields, bodyId, languageCode)

        return new EmailMessageTemplate(subject, body);

    }




}