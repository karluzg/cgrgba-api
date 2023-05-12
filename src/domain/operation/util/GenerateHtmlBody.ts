export class GenerateHtmlBody {

    public static generateNewUserBody(userFullName: string, email: string, password: string): string {
        let result = "";
        const message = `
        <h1>Bem-vindo!</h1>
        <p>Olá,${userFullName}</p>
        <p>Foi registrado como um novo utilizador na plataforma.</p>
        <p>Seus detalhes de acesso:</p>
        <ul>
          <li>Email: ${email}</li>
          <li>Senha: ${password}</li>
        </ul>
        <p>Por motivos de segurança, recomendamos que altere sua senha na primeira vez que acessar a plataforma.</p>
        <p>Para fazer isso, siga as instruções abaixo:</p>
        <ol>
          <li>Acesse a plataforma usando seu email e senha fornecidos.</li>
          <li>Navegue até a seção de configurações da conta.</li>
          <li>Localize a opção para alterar a senha.</li>
          <li>Siga as instruções na tela para definir uma nova senha segura.</li>
        </ol>
        <p>Se você tiver alguma dúvida ou precisar de assistência adicional, entre em contato conosco.</p>
        <p>Obrigado e bem-vindo!</p>
      `
 
        return message;
    }


}