export enum MiddlewareCustomErrorMessage {



    //INVALID_PARAMETERS CUSTOM MESSAGE


    //NOT_IMPLEMENTED CUSTOM MESSAGE
    METHOD_NOT_IMPLEMENTED = "Método não implementado",


    //UNAUTHORIZED CUSTOM MESSAGE

    OPERTATION_NOT_ALLOWED = "Não tem permissão para executar esta operação",
    OPERATION_WAS_NOT_FOUND = "Operação não econtrada",
    INVALID_TOKEN = "Não existe sessão válida para executar a operação",

    //FORBIDDEN CUSTOM MESSAGE 
    UNEXPECTED_UNEXECUTED_INITIAL_ACTION = "Tem ações iniciais não executadas",


    //UNSUCCESSFULLY CUSTOM MESSAGE
    ERROR_WHILE_SEARCHING_USER_INITIAL_ACTION = "Ocorreu um erro na pesquisa de ação inicial do utilizador:",
    INTERNAL_SERVER_ERROR = "Ocorreu um erro interno no servidor:"
}