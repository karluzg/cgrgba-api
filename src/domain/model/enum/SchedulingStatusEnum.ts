import { de } from "date-fns/locale";
import { SchedulingStatus } from "../SchedulingStatus";

export enum SchedulingStatusEnum {
    FOR_ANSWERING = "Por atender",
    ANSWERED = "Atendido",
    CANCELED = "Cancelado",
    REMOVED = "Removido"
}

export class SchedulingStatusMapper {
    public static from(status: SchedulingStatus): SchedulingStatusEnum | null {
        if (status == null || status.getCode() == null) {
            return null;
        }

        if (status.getCode() === SchedulingStatusEnum.FOR_ANSWERING) {
            return SchedulingStatusEnum.FOR_ANSWERING;
        } else if (status.getCode() === SchedulingStatusEnum.ANSWERED) {
            return SchedulingStatusEnum.ANSWERED;
        }
        else if (status.getCode() === SchedulingStatusEnum.CANCELED) {
            return SchedulingStatusEnum.CANCELED;
        } else {
            return SchedulingStatusEnum.REMOVED;
        }
    }

    public static status(schedulingStatus: SchedulingStatusEnum): SchedulingStatus {
        const status = this.mapper(schedulingStatus)
        return new SchedulingStatus(status);
    }

    public static mapper(status: SchedulingStatusEnum): string {
        switch (status) {
            case SchedulingStatusEnum.FOR_ANSWERING:
                return "FOR_ANSWERING";
            case SchedulingStatusEnum.ANSWERED:
                return "ANSWERED"
            case SchedulingStatusEnum.CANCELED:
                return "ANSWERED";
            case SchedulingStatusEnum.REMOVED:
                return "REMOVED"
            default:
                return "FOR_ANSWERING";

        }
    }
}
