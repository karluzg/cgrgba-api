// As operações são as permissões gravadas na base de dados, com os identificadores definidos nesta classe
// as operações são definidas da seguinte forma: "NOME-DO-CONTROLLER_OPERAÇÃO"
export enum OperationNamesEnum {

    //USERS -  1 to 100 
    USER_CREATE = 1,
    USER_GET_LIST = 2,
    USER_GET_DETAIL = 3,
    USER_UPDATE = 4,
    USER_UPDATE_PASSWORD=5,
    USER_RESET_PASSWORD=6,


    //SCEHDULING TIME -  101 to 201
    TIMESLOT_CREATE = 101,
    TIMESLOT_GET_LIST = 102,

    //SCHEDULING -  202 - 302
    SCHEDULING_CREATE = 202,
    SCHEDULING_LIST = 203,
    SCHEDULING_DETAIL = 204,
    SCHEDULING_UPDATE = 205,

    //PORTAL -  303 - 403
    PORTAL_ADD_NEWS = 303,

    //FEEDBACK -  404 - 504
    FEEDBACK_ADD = 404,


    //ROLES -  505 to 605 
    ROLES_ADD = 505,
    ROLES_UPDATE = 506,

    //DOUMENTS -  606 to 706
    DOCUMENT_UPLOAD = 607,
    DOCUMENT_DONWLOAD = 608,

    //AUTH -  707 to 807 // Não é preciso guardar essa operação na BD, logo, dá-mos o nome para efeito de log
    SESSION_LOGIN = 707,
    SESSION_LOGOUT = 708

}