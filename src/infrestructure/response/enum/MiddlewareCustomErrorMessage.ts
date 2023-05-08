export enum MiddlewareBusinessMessage {

    // BUSINESS MESSAGE - USER MANAGER 
    USER_ADDED = "Utilizador Registado com sucesso",
    USER_MANAGER_INVALID_USER_NAME = "O nome do utilizador é inválido",
    USER_INVALID_CREDENTIALS = "Credenciais inválidas",
    USER_INVALID_EMAIL = "Email inválido ou já existe um utilizador registado com o mesmo email",
    USER_MBILE_NUMBER_ALREADY_EXIST = "já existe um utilizador registado com o mesmo número de telemóvel",


    //  BUSINESS MESSAGE - SCHEDULING TIME
    SCHEDULING_TIME_ADDED = "Faixas horárias adicionadas com sucesso com sucesso",
    SCHEDULING_TIME_NOT_ADDED = "Faixas horárias não adicionadas.",
    SCHEDULING_TIME_ALREADY_EXIST = "Já existe uuma configuração horária para data indicada. Por favor, utilize o serviço de editar configuração horária",
    SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER_MANDATORY = "A configuração de agendamento deve ter pelo menos um funcionário",
    SCHEDULING_TIME_END_SCHEDULING_DATE_GREATHER_THAN_END_SCHEDULING_DATE = "A data de fim de agendamento deve ser superior a data de início de agendamento",
    SCHEDULING_TIME_END_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE = "A data de início de agendamento deve ser superior a data de início de agendamento",
    SCHEDULING_TIME_END_WORK_TIME_GREATER_THAN_BEGIN_WORK_TIME = "A hora de fim de trabalho deve ser superior a hora de início de trabalho",
    SCHEDULING_TIME_BEGIN_LUNCH_TIME_GREATER_THAN_END_WORK_TIME = "A hora de início de almoço deve ser inferior a hora de fim de trabalho",
    SCHEDULING_TIME_BEGIN_LUNCH_TIME_GREATER_THAN_BEGIN_WORK_TIME = "A hora de início de almoço deve ser superior a hora de início de trabalho",
    SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_BEGIN_WORK_TIME = "A hora de FIM de almoço deve ser superior a hora de fim de trabalho",
    SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_BEGIN_LUNCH_TIME = "A hora de fim de almoço deve ser superior a hora de início de trabalho",
    SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_END_LUNCH_TIME = "A hora de fim de almoço deve ser superior a hora de início de almoço",
    
    // BUSINESS MESSAGE - SCHEDULING


    //  BUSINESS MESSAGE - DCOUMENT 


    //  BUSINESS MESSAGE - NEWS
    
    
    // CORE MESSAGE
    
    CORE_METHOD_NOT_IMPLEMENTED = "Método não implementado",
    CORE_OPERTATION_NOT_ALLOWED = "Não tem permissão para executar esta operação",
    CORE_OPERATION_WAS_NOT_FOUND = "Operação não econtrada",
    CORE_INVALID_TOKEN = "Sessão inválida",
    CORE_INVALID_PARAMETERS = "Os parâmetros introduzidos estão inválidos",
    CORE_UNEXPECTED_UNEXECUTED_INITIAL_ACTION = "Deve alterar a sua palavra-passe antes de executar esta operação",
    CORE_INTERNAL_SERVER_ERROR = "Ocorreu um erro interno no servidor. Por favor, contacte a equipa da Nantoi Digital",
    CORE_TOKEN_NOT_FOUND = "O Token de autorização não foi encontrado!"
}