// As operações são as permissões gravadas na base de dados, com os identificadores definidos nesta classe
// as operações são definidas da seguinte forma: "NOME-DO-CONTROLLER_OPERAÇÃO"
export enum OperationNamesEnum {

    //USERS -  1 to 100 
    USER_CREATE = 1,
    USER_GET_LIST = 2,
    USER_GET_DETAIL = 3,
    USER_UPDATE = 4,
    USER_UPDATE_PASSWORD = 5,
    USER_RESET_PASSWORD = 6,
    USER_GET_BY_EMAIL = 7,
    USER_GET_BY_ID = 8,



    //SCEHDULING TIME -  101 to 201
    TIMESLOT_CREATE = 101,
    TIMESLOT_GET_LIST = 102,

    //SCHEDULING -  202 - 302
    SCHEDULING_CREATE = 202,
    SCHEDULING_LIST = 203,
    SCHEDULING_DETAIL = 204,
    SCHEDULING_UPDATE = 205,
    SCHEDULING_SERVICE_GET = 206,
    SCHEDULING_CHANGE_STATUS = 207,
    SCHEDULING_GET_STATISTICS = 208,
    SCHEDULING_GET_GETEGORY = 209,

    //PORTAL -  303 - 403
    PORTAL_ADD_NEWS = 303,
    PORTAL_LIST_NEWS = 304,
    PORTAL_ADD_FILE = 305,
    PORTAL_ADD_NEWS_CATEGORY=306,
    PORTAL_LIST_NEWS_CATEGORY=307,

    //FEEDBACK -  404 - 504
    FEEDBACK_ADD = 404,
    FEEDBACK_LIST = 405,
    FEEDBACK_GET_DETAIL = 406,
    FEEDBACK_LIST_MESSAGE_TYPE = 407,
    FEEDBACK_PUBLISH = 408,
    FEEDBACK_UPDATE_STATUS = 409,





    //ROLES -  505 to 605 
    ROLE_ADD = 505,
    ROLE_UPDATE = 506,
    ROLE_GET_BY_NAME=507,
    ROLE_GET_BY_ID=508,
    ROLE_GET_ALL_ROLE_BY_FILER = 509,
    ROLE_GET_ALL_ROLE=  510,

    //DOUMENTS -  606 to 706
    DOCUMENT_UPLOAD = 607,
    DOCUMENT_DONWLOAD = 608,

    //AUTH -  707 to 807 // Não é preciso guardar essa operação na BD, logo, dá-mos o nome para efeito de log
    SESSION_LOGIN = 707,
    SESSION_LOGOUT = 708,

    // PERMISSION - 808 - 908
    PERMISSION_GET_LIST = 808,
    PERMISSION_GET_BY_CODE=809,
    
    //PERMISSION_GROUP 909 - 1009
    PERMISSION_GROUP_ADD = 909,
    PERMISSION_GROUP_GET_LIST = 910,
    PERMISSION_GROUP_GET_BY_CODE = 911,
    
    
}


export async function getOperationNameDescription(operationCode: string): Promise<string> {

    switch (operationCode) {
        case "USER_CREATE":
            return "Criar Novo utilizador";
        case "USER_GET_LIST":
            return "Listar Utilizadores";
        case "USER_GET_DETAIL":
            return "Consultar detalhe de utilizador";
        case "USER_UPDATE":
            return "Alterar dados do utilizador";
        case "USER_UPDATE_PASSWORD":
            return "Alterar palavra-passe do utilizador";
        case "USER_RESET_PASSWORD":
            return "Recuperar palavra-passe";
        case "IMESLOT_CREATE":
            return "Criar faixas horária";
        case "TIMESLOT_GET_LIST":
            return "Listar faixas horária";
        case "SCHEDULING_CREATE":
            return "Criar agendamento";
        case "SCHEDULING_LIST":
            return "Get Scheduling List";
        case "SCHEDULING_DETAIL.toString":
            return "Consulatar detalhe de agendamento";
        
        case "SCHEDULING_UPDATE":
            return "Alterar agendamento";
        case "SCHEDULING_SERVICE_GET":
            return "Consultar detalhe de serviço de agendamento";
        case "PORTAL_ADD_NEWS":
            return "Adicionar notícia no portal";
        case "FEEDBACK_ADD":
            return "Adicionar feedback";
        case "ROLES_ADD":
            return "Adicionar Perfil";
        case "ROLES_UPDATE":
            return "Alterar Perfil";
        case "DOCUMENT_UPLOAD":
            return "Carregar documento";
        case "DOCUMENT_DONWLOAD":
            return "Descarregar documento";
        default:
            return "Desconhecido";
    }
}
