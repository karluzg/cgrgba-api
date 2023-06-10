import { SchedulingResponse } from "./SchedulingResponse";
import { Scheduling } from "../../../model/Scheduling";

export class SchedulingBuilder {

    public static async buildSchedulingResponse(
        schedulingInput: Scheduling
    ): Promise<SchedulingResponse> {


        const newSchedulingResponse = {
            id: schedulingInput.id,
            date: schedulingInput.date,
            chosenHour: schedulingInput.chosenHour,
            citizen: schedulingInput.citizen,
            hour: schedulingInput.hour,
            minute: schedulingInput.minute,
            service: schedulingInput.service,
            status: schedulingInput.status,
            creationDate: schedulingInput.creationDate,
            attendBy: schedulingInput.attendBy,
            updateBy: schedulingInput.updateBy,
            attendDate: schedulingInput.attendDate,
            revokingDate: schedulingInput.revokingDate,
            lastPasswordUpdate: schedulingInput.lastPasswordUpdate,
        };

        return newSchedulingResponse

    }
}