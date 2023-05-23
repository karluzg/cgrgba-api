import { EmailMessageTemplate } from "../../../infrestructure/template/EmailMessageTemplate";
import { SchedulingTimeUtil } from "./SchedulingTimeUtil";

export class EmailUtils {

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

    public static async generateSchedulingEmailBody(citizenName: string,
        schedulingDate: string,
      schedulingHour: string,
        servico: string): Promise<EmailMessageTemplate> {

        const subject = "Consolado  Geral da Repúlica da Guiné-Bissau <geral@cgrgb.pt>"
        const message = `
        <!DOCTYPE html>
        <html lang="pt-PT">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmação do Agendamento</title>
          <style>
            /* Styles for the email body */
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              padding: 20px;
            }
        
            /* Styles for the email container */
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 40px;
              border-radius: 4px;
            }
        
            /* Styles for the logo */
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
        
            /* Styles for the table */
            table {
              width: 100%;
              border-collapse: collapse;
            }
        
            th, td {
              padding: 10px;
              text-align: center;
            }
        
            th {
              background-color: #f2f2f2;
              font-weight: bold;
              margin-bottom: 20px; /* Increased spacing between table headers */
              padding-bottom: 10px; /* Adjusted padding to push content further up */
            }
        
            /* Increase space between table cells */
            td {
              padding-top: 20px;
              padding-bottom: 20px;
            }
        
            /* Styles for the message */
            .message {
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="C:\Users\duarte.silva\Downloads\consolado.jpg" alt="Company Logo" width="150">
            </div>
        
            <h1>Schedule Confirmation</h1>
        
            <p>${await SchedulingTimeUtil.getGreet()} ${citizenName}!</p>
        
            <p>O seu agendamento foi confirmado. Aqui estão os detalhes:</p>
        
            <table>
              <tr>
                <th>Serviço</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Local</th>
              </tr>
              <tr>
                <td>${servico}</td>
                <td>${schedulingDate}</td>
                <td>${schedulingHour}</td>
                <td>Avenida da Liberdade 131, Edifício Atlântida, escritório 8 8200-002 Albufeira | Portugal</td>
              </tr>
            </table>
        
            <p>Obrigado por escolher o nosso serviço.</p>
        
            <div class="message">
              <p>Até já,</p>
              <p> Consolado Geral da Repúlica da Guiné-Bissau em Albufeira |289 588 084 | 961 941 934 </p>
              <p>Para acessar a plataforma, clique <a href="https://cgrgb.pt/">aqui</a>.</p>
            </div>
          </div>
        </body>
        </html>
        
            `;

        return new EmailMessageTemplate(subject, message);

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