export enum MiddlewareBusinessMessage {

    // BUSINESS MESSAGE - USER MANAGER 
    USER_ADDED = "Utilizador Registado com sucesso",
    USER_MANAGER_INVALID_USER_NAME = "O nome do utilizador é inválido",
    USER_INVALID_CREDENTIALS = "Credenciais inválidas",
    USER_INVALID_EMAIL = "Email inválido ou já existe um utilizador registado com o mesmo email",
    USER_MBILE_NUMBER_ALREADY_EXIST = "já existe um utilizador registado com o mesmo número de telemóvel",
    USER_NOT_FOUND="Utilizador não foi encontrado",
    ROLE_NOT_FOUND="Role não foi encontrado",
    PERMISSION_NOT_FOUND="Permissão não foi encontrado",
    PERMISSION_GOURP_NOT_FOUND="Grupo de permissões não foi encontrado",



    // BUSINESS MESSAGE - CITIZEN
    CITIZEN_INVALID_EMAIL = "Email inválido ou já existe um utilizador registado com o mesmo email",
    CITIZEN_MBILE_NUMBER_ALREADY_EXIST = "Email inválido ou já existe um utilizador registado com o mesmo email",


    //  BUSINESS MESSAGE - SCHEDULING TIME
    SCHEDULING_TIME_ADDED = "Faixas horárias foram configuradas com sucesso. Por favor, consulte a listagem de faixas horária",
    SCHEDULING_TIME_NOT_ADDED = "Faixas horárias não foram configuradas.",
    SCHEDULING_TIME_CONFIG_NOT_EXIST = "Não existe configuração de agendamento para a data indicada",



    SCHEDULING_TIME_ALREADY_EXIST = "Já existe uma configuração horária para data indicada. Por favor, utilize o serviço de editar configuração da horária",
    SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER_MANDATORY = "A configuração de agendamento deve ter pelo menos um funcionário",
    SCHEDULING_TIME_END_SCHEDULING_DATE_GREATHER_THAN_END_SCHEDULING_DATE = "A data de fim de agendamento deve ser superior a data de início de agendamento",
    SCHEDULING_TIME_BEGIN_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE = "A data de início de agendamento deve ser igual OU superior a data atual",
    SCHEDULING_TIME_END_WORK_TIME_GREATER_THAN_BEGIN_WORK_TIME = "A hora de fim de trabalho deve ser superior a hora de início de trabalho",
    SCHEDULING_TIME_BEGIN_LUNCH_TIME_GREATER_THAN_END_WORK_TIME = "A hora de início de almoço deve ser inferior a hora de fim de trabalho",
    SCHEDULING_TIME_BEGIN_LUNCH_TIME_GREATER_THAN_BEGIN_WORK_TIME = "A hora de início de almoço deve ser superior a hora de início de trabalho",
    SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_BEGIN_WORK_TIME = "A hora de FIM de almoço deve ser superior a hora de fim de trabalho",
    SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_BEGIN_LUNCH_TIME = "A hora de fim de almoço deve ser superior a hora de início de trabalho",
    SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_END_LUNCH_TIME = "A hora de fim de almoço deve ser superior a hora de início de almoço",
    

    // BUSINESS MESSAGE - SCHEDULING
    SCHEDULING_ALREADY_EXIST = "Já tem um agendamento com as mesmas características. Por favor, efetue um novo agendamento",
    SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON = "A hora já foi escolhido por um outro utilizador",
    SCHEDULING_ADDED = "O seu agendamento foi efetuado com sucesso",


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