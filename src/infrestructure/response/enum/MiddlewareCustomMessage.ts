export enum MiddlewareBusinessMessage {

  // BUSINESS MESSAGE - USER MANAGER 
  USER_INVALID_CREDENTIALS = "Credenciais inválidas",
  USER_EMAIL_ALREADY_EXIST = "Email inválido ou já existe um utilizador registado com o mesmo email",
  USER_MBILE_NUMBER_ALREADY_EXIST = "já existe um utilizador registado com o mesmo número de telemóvel",
  USER_NOT_EXIST = "Utilizador não existe",
  USER_PASSWORD_NOT_MATCH = "Erro no password de confirmação",
  USER_PASSWORD_MATCH = "Password nova igual a antiga",
  USER_PASSWORD_UPDATED_SUCCESSFULLY = "Password do utilizador atualizada com sucesso",
  USER_PASSWORD_RESET_SUCCESSFULLY = "Password redefinida com sucesso",
  USER_PASSWORD_LOCKED = "Passowrd bloqueda, tem de efectuar reset a password",
  USER_ADDED_SUCCESSFULLY = "Utilizador criado com sucesso",
  USER_GET_SUCCESSFULLY = "Utilizador obtido com sucesso",
  USER_GET_ALL_SUCCESSFULLY = "Lista de utilizadores obtida com sucesso",
  USER_PARAM_FULL_NAME = "Campo Full Name é não vazio, texto, tamanho maáximo 50",
  USER_PARAM_MOBILE_NUMBER = "Campo Mobile Number é não vazio, texto, tamanho minímo 9 e maáximo 21",
  USER_PARAM_EMAIL = "Campo Email é não vazio, texto ,no formato email, tamanho maáximo 34",
  USER_PARAM_ROLES = "O campo perfil deve ser um array não vazio de texto",
  ROLE_NOT_EXIST = "O perfil não existe",
  ROLE_ADDED_SUCCESSFULLY = "Perfil adiocionado com sucesso",
  ROLE_ALREADY_EXIST = "O perfil já exite",
  ROLE_GET_SUCCESSFULLY = "Perfil obtido com sucesso",
  ROLE_GET_LIST_SUCCESSFULLY = "Lista de perfil obtido com sucesso",
  PERMISSION_ADDED_SUCCESSFULLY = "Permissão adicioando com sucesso",
  PERMISSION_NOT_EXIST = "Permissão não existe",
  PERMISSION_ALREADY_EXIST = "Permissão já existe",
  PERMISSION_GET_SUCCESSFULLY = "Permissão obtido com sucesso",
  PERMISSION_GET_LIST_SUCCESSFULLY = "Lista de Permissão obtido com sucesso",
  PERMISSION_GROUP_ADDED_SUCCESSFULLY = "Grupo de mpermissões adicionado com sucesso",
  PERMISSION_GROUP_NOT_EXIST = "Grupo de permissões não foi encontrado",
  PERMISSION_GROUP_ALREADY_EXIST = "Grupo de Permissões já existe",
  PERMISSION_GROUP_GET_SUCCESSFULLY = "Grupo de Permissões obtido com sucesso",
  PERMISSION_GROUP_LIST_SUCCESSFULLY = "Lista de Grupo de Permissões obtido com sucesso",
  SESSION_LOGIN_SUCCESSFULLY = "Login realizado com sucesso",
  USER_STATUS_CODE_MANDATORY = "O estado do utilizador é obrigatório",
  USER_STATUS_NOT_EXIST = "Tipo de estado de utilizador não existe",
  SESSION_LOGOUT_ERROR="O sistema nao consegiu efetuar logout do utilizador", 
  SESSION_NOT_EXIST="Sessão do utilizador não existe", 



  // BUSINESS MESSAGE - CITIZEN
  CITIZEN_INVALID_EMAIL = "Email inválido ou já existe um utilizador registado com o mesmo email",
  CITIZEN_MOBILE_NUMBER_ALREADY_EXIST = "Email inválido ou já existe um utilizador registado com o mesmo email",


  //  BUSINESS MESSAGE - SCHEDULING TIME
  SCHEDULING_TIME_ADDED = "Faixas horárias foram configuradas com sucesso. Por favor, consulte a listagem de faixas horária",
  SCHEDULING_TIME_NOT_ADDED = "Faixas horárias não foram configuradas.",
  SCHEDULING_TIME_DATE_CONFIG_NOT_EXIST = "Não existe configuração de agendamento para a data indicada",
  SCHEDULING_TIME_HOUR_CONFIG_NOT_EXIST = "Não existe configuração de agendamento para a hora indicada",



  SCHEDULING_TIME_ALREADY_EXIST = "Já existe uma configuração horária para data indicada. Por favor, utilize o serviço de editar configuração da faixa horária ou cria uma nova",
  SCHEDULING_TIME_AVAILABLE_COLLABORATOR_NUMBER_MANDATORY = "A configuração de agendamento deve ter pelo menos um funcionário",
  SCHEDULING_TIME_END_SCHEDULING_DATE_GREATHER_THAN_EQUAL_BEGIN_SCHEDULING_DATE = "A data de fim de agendamento deve ser igual ou superior a data de início de agendamento",
  SCHEDULING_TIME_BEGIN_SCHEDULING_DATE_GREATHER_THAN_CURRENT_DATE = "A data de início de agendamento deve ser igual ou superior a data atual",
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
  SCHEDULING_TIME_END_LUNCH_TIME_GREATER_THAN_END_LUNCH_TIME = "A hora de fim de almoço deve ser igual ou superior a hora de início de almoço",


  // BUSINESS MESSAGE - SCHEDULING
  SCHEDULING_ALREADY_EXIST = "Já tem um agendamento com as mesmas características. Por favor, efetue um novo agendamento",
  SCHEDULING_HOUR_ALREADY_CHOSED_BY_ANTOTHER_PERSON = "A hora já foi escolhido por um outro utilizador",
  SCHEDULING_ADDED = "O seu agendamento foi efetuado com sucesso",
  SCHEDULING_BEGIN_WORK_TIME_LESS_THAN_SCHDULING_CONFIG_TIME = "Não existe agendamento para o horário indicado.",
  SCHEDULING_BGIN_CREATION_DATE_MANDATORY = "A data de início de criação de agendamento é obrigatório",
  SCHEDULING_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE = "A data de fim de agendamento deve ser igual ou superior a data de início de agendamento",
  SCHEDULING_BEGIN_SCHEDULING_TIME_MANDATORY = "A hora de início de agendamento é obrigatório",
  SCHEDULING_END_SCHEDULING_TIME_LESS_THAN_BEGIN_SCHEDULING_DATE = "A hora de fim de agendamento deve ser igual ou superior a hora de início de agendamento",
  SCHEDULING_TIME_END_SCHEDULING_TIME_GREATER_THAN_BEGIN_SCHEDULING_TIME = "A hora de fim de agendamento deve ser igual ou superior a hora de início de agendamento",
  SCHEDULING_BEGIN_SCHEDULING_TIME_INAVLID = "A hora de início de agendamento é inválida",
  SCHEDULING_END_SCHEDULING_TIME_INAVLID = "A hora de fim de agendamento é inválida",
  SCHEDULING_BEGIN_DATE_INVALID = "A data de início de agendamento é inváldo",
  SCHEDULING_END_DATE_INVALID = "A data de fim de agendamento é inváldo",
  SCHEDULING_AVAILABLE = "Não existe disponibilidade",
  SCHEDULING_ID_INVALID = "Agendamento inválido",
  SCHEDULING_HAS_INVALID_STATE_TO_UPDATE = "Só é possível alterar um agendamento que está Por Atender",
  SCHEDULING_CATEGORY_INVALD = "A categoria de agendamento é inválida",
  SCHEDULING_SERVICE_INVALID = "O servico do agendamento é inválido",
  SCHEDULING_STATUS_CODE_INVALID="Estado do agendamento é inválido",


  // BUSINESS MESSAGE - FEEDBACK
  FEEDBACK_MESSAGE_TYPE_CODE_MANDATORY = "O campo tipo de mensagem de feedback é obrigatório",
  FEEDBACK_NAME_MANDATORY = "O campo nome é obrigatório",
  FEEDBACK_EMAIL_MANDATORY = "O campo email é obrigatório",
  FEEDBACK_MESSAGE_MANDATORY = "O conteúdo da mensagem é obrigatório",

  FEEDBACK_MESSAGE_TYPE_CODE_INVALD = "O tipo de mensagem de feedback é inválido",
  FEEDBACK_ID_INVALID = "Mensagem de feedback não existe",
  FEEDBACK_BEGIN_DATE_INVALID = "A data de início de feedback é inváldo",
  FEEDBACK_END_DATE_INVALID = "A data de fim de feedback é inváldo",
  FEEDBACK_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE = "A data de fim de feedback deve ser igual ou superior a data de início de feedback",
  FEEDBACK_STATUS_INVALID = "O estado de feedback é inválido",



  //  BUSINESS MESSAGE - DCOUMENT


  //  BUSINESS MESSAGE - NEWS
  NEWS_INVALID_CATEGORY = "Erro de validação dos dados da notícia",
  NEWS_CATEGORY_NOT_EXIST = "Categoria de notícia não existe",
  NEWS_ADD_SUCCESSFULLY = " Notícia criada com sucesso",
  NEWS_FILE_ADD_SUCCESSFULLY = " Imagem da notícia adicionada com sucesso",
  NEWS_GET_ALL_SUCCESSFULLY = "Lista de notícias recuperada com sucesso",
  NEW_NOT_FOUND = "Notícia não existe",
  NEWS_INVALID_TITLE = "Existe uma noticia com mesmo titulo, mude o titulo e tente novamente",
  NEWS_INVALID_FILE_UPLOAD = "Ficheiro ou o formato do ficheiro carregado é invalido",
  NEWS_CATEGORY_ALREADY_EXIST="Categoria de noticia já existe",
  

  // CORE MESSAGE
  SUCCESS_MESSAGE = "Operação realizada com sucesso",
  CORE_METHOD_NOT_IMPLEMENTED = "Método não implementado",
  CORE_OPERTATION_NOT_ALLOWED = "Não tem permissão para executar esta operação",
  CORE_OPERATION_WAS_NOT_FOUND = "Operação não econtrada",
  CORE_INVALID_TOKEN = "Sessão inválida",
  CORE_INVALID_PARAMETERS = "Os parâmetros introduzidos estão inválidos",
  CORE_UNEXPECTED_UNEXECUTED_INITIAL_ACTION = "Deve alterar a sua palavra-passe antes de executar esta operação",
  CORE_INTERNAL_SERVER_ERROR = "Ocorreu um erro interno no servidor. Por favor, contacte a equipa da Nantoi Digital",

}