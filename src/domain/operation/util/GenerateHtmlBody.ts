import { EmailMessageTemplate } from "../../../infrestructure/template/EmailMessageTemplate";

export class GenerateHtmlBody {

  public static generateNewUserBody(userFullName: string, email: string, password: string, link: string, emailContact:string): EmailMessageTemplate {

    const subject= "Bem-vindo à plataforma Portal Consular";
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

    return new EmailMessageTemplate(subject,message);
  }


}