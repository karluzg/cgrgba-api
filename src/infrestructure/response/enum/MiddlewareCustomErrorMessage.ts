export enum MiddlewareBusinessMessage {


    // BUSINESS MESSAGE - USER MANAGER 1 -100
    USER_MANAGER_INVALID_USER_NAME="O nome do utilizador está inválido",
    USER_EMIAL_NOT_FOUND="O utilizador com esse email não foi encontrado!",
    USER_INVALID_PASSWORD = "A palavra-passe  está inválida",
    USER_INVALID_EMAIL = "Email inválido ou existe um utilizador na base de dados com o mesmo email",
  
    // BUSINESS MESSAGE - SCHEDULING AND SCHEDULING TIME 101 201
    
    
    //  BUSINESS MESSAGE - SCHEDULING AND SCHEDULING TIME 202 -302

    
    //  BUSINESS MESSAGE - DCOUMENT 


    //  BUSINESS MESSAGE - NEWS
    
    
    // CORE MESSAGE
    
    
    METHOD_NOT_IMPLEMENTED = "Método não implementado",
    OPERTATION_NOT_ALLOWED = "Não tem permissão para executar esta operação",
    OPERATION_WAS_NOT_FOUND = "Operação não econtrada",
    INVALID_TOKEN = "Não existe sessão válida para executar a operação",
    INVALID_PARAMETERS = "Os parâmetros introduzidos estão inválidos",
    UNEXPECTED_UNEXECUTED_INITIAL_ACTION = "Tem ações iniciais não executadas",
    ERROR_WHILE_SEARCHING_USER_INITIAL_ACTION = "Ocorreu um erro na pesquisa de ação inicial do utilizador:",
    INTERNAL_SERVER_ERROR = "Ocorreu um erro interno no servidor:",
    TOKEN_NOT_FOUND="O Token de autorização não foi encontrado!"
}