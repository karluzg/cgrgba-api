import { container } from "tsyringe";
import { EmailMessageTemplate } from "../../../infrestructure/template/EmailMessageTemplate";
import { MessageTemplateFixedId } from "../../model/enum/MessageTemplateFixedId";
import { IMessageContentsEngineRepository } from "../../repository/IMessageContentsEngineRepository";
import { TemplateUtils } from "./TemplateUtils";
import { Language } from "../../model/LanguageTranslation";
import { SchedulingTimeUtil } from "./SchedulingTimeUtil";


export class EmailNotification {


    public static generateNewUserBody(userFullName: string, email: string, password: string, link: string,
        emailContact: string): EmailMessageTemplate {

        const subject = "Bem-vindo à plataforma Portal Consular";
        const message = `
        <h1>Bem-vindo!</h1>
  <p>Olá, ${userFullName}</p>
  <p>Foi registado como um novo utilizador no Portal Consular.</p>
  <p>Seus detalhes de acesso:</p>
  <ul>
    <li>Email: ${email}</li>
    <li>Senha: ${password}</li>
  </ul>
  <p>Por motivos de segurança, recomendamos que altere sua senha na primeira vez que aceder a plataforma.</p>
  <p>Para fazer isso, siga as instruções abaixo:</p>
  <ol>
    <li>Aceda a plataforma usando seu email e senha fornecidos.</li>
    <li>Navegue até a seção de configurações da conta.</li>
    <li>Localize a opção para alterar a senha.</li>
    <li>Siga as instruções para definir uma nova senha segura.</li>
  </ol>
  <p>Se tiver alguma dúvida ou precisar de assistência adicional, entre em contato connosco através do seguinte email: ${emailContact} .</p>
  <p>Obrigado e bem-vindo!</p>
  <p>Para acessar a plataforma, clique <a href="${link}">aqui</a>.</p>
`;

        return new EmailMessageTemplate(subject, message);
    }

    public static async sendSchedulingConfirmationEmail(citizenName: string,
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

        const geeting: string = await SchedulingTimeUtil.getGreet()
        fields.set('GREETING', geeting);

        const body: string = await TemplateUtils.getTemplateText(messageContsEngineRepository, fields, bodyId, languageCode)

        return new EmailMessageTemplate(subject, body);

    }

    public static generateResetPasswordBody(userFullName: string, email: string, password: string, link: string, emailContact: string): EmailMessageTemplate {
        const subject = "Redefinição de password no Portal Consular";
        const message = `
        
          <h1>Redefinição de password</h1>
          <p>Olá, ${userFullName}</p>
          <p>Recebemos uma solicitação para redefinição da sua password no Portal Consular.</p>
          <p>Aqui estão as informações para acessar sua conta:</p>
          <ul>
            <li>Email: ${email}</li>
            <li>Nova password: ${password}</li>
          </ul>
          <p>Por motivos de segurança, recomendamos que você altere sua password assim que fizer o primeiro acesso à plataforma.</p>
          <p>Para fazer isso, siga as instruções abaixo:</p>
          <ol>
            <li>Aceda a plataforma usando seu email e nova password fornecidos.</li>
            <li>Navegue até a seção de configurações da conta.</li>
            <li>Localize a opção para alterar a password.</li>
            <li>Siga as instruções para definir uma nova password segura.</li>
          </ol>
          <p>Se você não solicitou a redefinição de password ou se tiver alguma dúvida, entre em contato conosco através do seguinte email: ${emailContact}.</p>
          <p>Obrigado!</p>
        `;

        return new EmailMessageTemplate(subject, message);
    }


}