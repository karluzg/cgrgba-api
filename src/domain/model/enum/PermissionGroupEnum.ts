export enum PermissionGroupEnum {
    USERS = "Utilizadores",
    SCHEDULING = "Agendamentos",
    TIMESLOT = "Horários de agendamento",
    PORTAL = "Portal",
    FEEDBACK = "Feedback",
    PERMISSION = "Permissões",
    ROLES = "perfis",
    DOUMENTS = "Formulários"

}

export async function generatePermisionGroupDescription(status: string): Promise<string> {
    switch (status) {
        case "USER":
            return "Utilizadores";
        case "SCHEDULING":
            return "Agendamentos";
        case "TIMESLOT":
            return "Horários de agendamentos";
        case "PORTAL":
            return "Portal";
        case "FEEDBACK":
            return "Opiniões, Elogios, reclamaações"
        case "PERMISSIONS":
            return "Permissões"
        case "ROLES":
            return "perfis"
        case "DOUMENT":
            return "Formulários"
        default:
            return "Desconhecido";
    }
}