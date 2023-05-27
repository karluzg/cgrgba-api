export enum MiddlewareBusinessMessage {

  // BUSINESS MESSAGE - USER MANAGER 
  USER_ADDED = "Utilizador Registado com sucesso",
  USER_MANAGER_INVALID_USER_NAME = "O nome do utilizador é inválido",
  USER_INVALID_CREDENTIALS = "Credenciais inválidas",
  USER_INVALID_EMAIL = "Email inválido ou já existe um utilizador registado com o mesmo email",
  USER_MBILE_NUMBER_ALREADY_EXIST = "já existe um utilizador registado com o mesmo número de telemóvel",
  USER_NOT_FOUND = "Utilizador não foi encontrado",
  USER_PASSWORD_NOT_MATCH = "Erro no password de confirmação",
  USER_PASSWORD_MATCH = "Password nova igual a antiga",
  USER_PASSWORD_UPDATED_SUCCESSFULLY = "Password do utilizador atualizada com sucesso",
  USER_PASSWORD_RESET_SUCCESSFULLY = "Password redefinida com sucesso",
  USER_PASSWORD_LOCKED = "Passowrd bloqueda, tem de efectuar reset a password",
  USER_ADDED_SUCCESSFULLY = "Utilizador criado com sucesso",
  USER_GET_SUCCESSFULLY = "Utilizador obtido com sucesso",
  ROLE_NOT_FOUND = "Role não foi encontrado",
  ROLE_ADDED_SUCCESSFULLY  = "Role adiocionado com sucesso",
  ROLE_ALREADY_EXIST ="A role j+á exite na base de dados",
  PERMISSION_NOT_FOUND = "Permissão não foi encontrado",
  PERMISSION_GOURP_NOT_FOUND = "Grupo de permissões não foi encontrado",
  SESSION_LOGIN_SUCCESSFULLY = "Login realizado com sucesso",
  USER_STATUS_CODE_MANDATORY = "O estado do utilizador é obrigatório",
  USER_STATUS_NOT_FOUND = "Tipo de estado de utilizador não foi encontrado",
  ROLE_GET_SUCCESSFULLY = "Role obtido com sucesso",
  ROLE_GET_LIST_SUCCESSFULLY = "Lista de Role obtido com sucesso",



  // BUSINESS MESSAGE - CITIZEN
  CITIZEN_INVALID_EMAIL = "Email inválido ou já existe um utilizador registado com o mesmo email",
  CITIZEN_MOBILE_NUMBER_ALREADY_EXIST = "Email inválido ou já existe um utilizador registado com o mesmo email",


  //  BUSINESS MESSAGE - SCHEDULING TIME
  SCHEDULING_TIME_ADDED = "Faixas horárias foram configuradas com sucesso. Por favor, consulte a listagem de faixas horária",
  SCHEDULING_TIME_NOT_ADDED = "Faixas horárias não foram configuradas.",
  SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST = "Não existe configuração de agendamento para a data indicada",
  SCHEDULING_TIME_HOUR_CONFIG_NOT_EXIST = "Não existe configuração de agendamento para a hora indicada",



  SCHEDULING_TIME_ALREADY_EXIST = "Já existe uma configuração horária para data indicada. Por favor, utilize o serviço de editar configuração da horária",
  SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER_MANDATORY = "A configuração de agendamento deve ter pelo menos um funcionário",
  SCHEDULING_TIME_END_SCHEDULING_DATE_GREATHER_THAN_END_SCHEDULING_DATE = "A data de fim de agendamento deve ser superior a data de início de agendamento",
  SCHEDULING_TIME_BEGIN_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE = "A data de início de agendamento deve ser IGUAL OU superior a data atual",
  SCHEDULING_TIME_AFTER_CURRENT_DATE = "Só é possível configurar horário de agendamento a partir do dia seguinte à data atual",

  SCHEDULING_TIME_WEEKEND_BEGIN_DATE = "A data de início é um fim de semana. Por favor, selecione uma data posterior à data atual",
  SCHEDULING_TIME_WEEKEND_END_DATE = "A data de fim é um fim de semana. Por favor, selecione uma data posterior à data atual OU IGUAL a data de início",

  SCHEDULING_TIME_HOLLYDAY_BEGIN_DATE = "A data de início é um feriado. Por favor, selecione uma data válida",
  SCHEDULING_TIME_HOLLYDAY_END_DATE = "A data de fim é um feriado. Por favor, selecione uma data válida",

  SCHEDULING_TIME_END_WORK_TIME_GREATER_THAN_BEGIN_WORK_TIME = "A hora de fim de trabalho deve ser superior a hora de início de trabalho",
  SCHEDULING_TIME_BEGIN_LUNCH_TIME_GREATER_THAN_END_WORK_TIME = "A hora de início de almoço deve ser inferior a hora de fim de trabalho",
  SCHEDULING_TIME_BEGIN_LUNCH_TIME_GREATER_THAN_BEGIN_WORK_TIME = "A hora de início de almoço deve ser superior a hora de início de trabalho",
  SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_BEGIN_WORK_TIME = "A hora de fim de almoço deve ser superior a hora de fim de trabalho",
  SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_BEGIN_LUNCH_TIME = "A hora de fim de almoço deve ser superior a hora de início de trabalho",
  SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_END_LUNCH_TIME = "A hora de fim de almoço deve ser IGUAL OU superior a hora de início de almoço",


  // BUSINESS MESSAGE - SCHEDULING
  SCHEDULING_ALREADY_EXIST = "Já tem um agendamento com as mesmas características. Por favor, efetue um novo agendamento",
  SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON = "A hora já foi escolhido por um outro utilizador",
  SCHEDULING_ADDED = "O seu agendamento foi efetuado com sucesso",
  SCHEDULING_BEGIN_WORK_TIME_LESS_THAN_SCHDULING_CONFIG_TIME = "Não existe agendamento para o horário indicado.",
  SCHEDULING_BGIN_CREATION_DATE_MANDATORY = "A data de início de criação de agendamento é obrigatório",
  SCHEDULING_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE = "A data de fim de criação de agendamento deve ser IGUAL OU superior a data de início de criação de agendamento",
  SCHEDULING_BEGIN_SCHEDULING_TIME_MANDATORY = "A hora de início de agendamento é obrigatório",
  SCHEDULING_END_SCHEDULING_TIME_LESS_THAN_BEGIN_SCHEDULING_DATE = "A hora de fim de agendamento deve ser IGUAL OU superior a hora de início de agendamento",
  SCHEDULING_TIME_END_SCHEDULING_TIME_GREATER_THAN_BEGIN_SCHEDULING_TIME = "A hora de fim de agendamento deve ser IGUAl OU superior a hora de início de agendamento",
  SCHEDULING_BEGIN_SCHEDULING_TIME_INAVLID = "A hora de início de agendamento é inválida",
  SCHEDULING_END_SCHEDULING_TIME_INAVLID = "A hora de fim de agendamento é inválida",
  SCHEDULING_BEGIN_CREATION_DATE_INVALID = "A data de início de criação de agendamento é inváldo",
  SCHEDULING_END_CREATION_DATE_INVALID = "A data de fim de criação de agendamento é inváldo",
  SCHEDULING_AVAILABLE = "Não existe disponibilidade",
  SCHEDULING_ID_INVALID = "Agendamento inválido",
  SCHEDULING_CATEGORY_INVALD = "A categoria de agendamento é inválida",
  SCHEDULING_SERVICE_INVALID = "O servico do agendamento é inválido",



  //  BUSINESS MESSAGE - DCOUMENT 
  //  BUSINESS MESSAGE - NEWS
  NEWS_INVALID_CATEGORY = "Erro de validação dos dados da notícia",
  NEWS_ADD_SUCCESSFULLY = " Notícia criada com sucesso",
  NEWS_GET_ALL_SUCCESSFULLY = "Lista de notícias recuperada com sucesso",
  NEWS_INVALID_TITLE = "Existe uma noticia com mesmo titlo, mude o titlo e tente novamente",
  NEWS_INVALID_FILE_UPLOAD = "Ficheiro ou o formato do ficheiro carregado é invalido",

  // CORE MESSAGE
  CORE_METHOD_NOT_IMPLEMENTED = "Método não implementado",
  CORE_OPERTATION_NOT_ALLOWED = "Não tem permissão para executar esta operação",
  CORE_OPERATION_WAS_NOT_FOUND = "Operação não econtrada",
  CORE_INVALID_TOKEN = "Sessão inválida",
  CORE_INVALID_PARAMETERS = "Os parâmetros introduzidos estão inválidos",
  CORE_UNEXPECTED_UNEXECUTED_INITIAL_ACTION = "Deve alterar a sua palavra-passe antes de executar esta operação",
  CORE_INTERNAL_SERVER_ERROR = "Ocorreu um erro interno no servidor. Por favor, contacte a equipa da Nantoi Digital",
  SCHEDULING_HOUR_ALREADY_CHOSEN_BY_ANOTHER_PERSON = "SCHEDULING_HOUR_ALREADY_CHOSEN_BY_ANOTHER_PERSON"
}