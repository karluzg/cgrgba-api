import { Citizen } from "../../../model/Citizen";
import { Scheduling } from "../../../model/Scheduling";
import { SchedulingStatus } from "../../../model/SchedulingStatus";
import { Service } from "../../../model/Service";
import { UserResponse } from "../user-manager/UserResponse";

export class SchedulingResponse {
    id: number;
    date: string;
    chosenHour: string;
    citizen: Citizen;
    hour: number;
    minute: number;
    service: Service;
    status: SchedulingStatus;
    creationDate: Date;
    attendBy: UserResponse;
    updateBy: UserResponse;
    attendDate: Date;
    revokingDate: Date;
    lastPasswordUpdate: Date;

    constructor(scheduling: Scheduling) {
        this.id = scheduling.id;
        this.date = scheduling.date;
        this.chosenHour = scheduling.chosenHour;
        this.citizen = scheduling.citizen;
        this.hour = scheduling.hour;
        this.minute = scheduling.minute;
        this.service = scheduling.service;
        this.status = scheduling.status;
        this.creationDate = scheduling.creationDate;
        this.attendBy = scheduling.attendBy;
        this.updateBy = scheduling.updateBy;
        this.attendDate = scheduling.attendDate;
        this.revokingDate = scheduling.revokingDate;
        this.lastPasswordUpdate = scheduling.lastPasswordUpdate;
    }
}
