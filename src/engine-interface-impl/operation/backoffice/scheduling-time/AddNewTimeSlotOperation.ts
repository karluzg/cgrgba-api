import { TokenSession } from "../../../../domain-model/TokenSession";
import { AddNewTimeSlotParams } from "../../../../engine-interface/params/scheduling-time/AddNewTimeSlotParams";
import { AddNewTimeSlotResult } from "../../../../engine-interface/result/scheduling-time/AddNewTimeSlotResult";
import { UserAuthOperationTemplate } from "../../UserAuthOperationTemplate";
import { OperationNames } from "../../OperationNames";
import { OperationValidatorManager } from "../../../managers/OperationValidatorManager";
import { NotImplementedException } from "../../../../common/exceptions/NotImplementedException";
import { SchedulingTimeHour } from "../../../../domain-model/SchedulingTimeHour";
import { Hour } from "../../../../domain-model/Hour";
import { SchedulingTime } from "../../../../domain-model/SchedulingTime";
import logger from "../../../../common/config/logger";
import { Result } from "../../../../engine-interface/Result";

export class AddNewTimeSlotOperation extends UserAuthOperationTemplate<AddNewTimeSlotResult, AddNewTimeSlotParams>{



    constructor() {
        super(OperationNames.ADD_NEW_TIME_SLOT, new OperationValidatorManager)
    }


    protected doUserAuthExecuted(tokenSession: TokenSession, params: AddNewTimeSlotParams, result: AddNewTimeSlotResult) {

        // TO BE IMPLEMENT
        logger.info("Chegou aqui na adição do slot horário")
        const schedulingTimeHour: SchedulingTimeHour = new SchedulingTimeHour()
        const hours: Hour[] = [];
        const hour: Hour = new Hour()

        hour.hourCode = "11h30"
        hour.hourDesignation = "11 horas e 30 min"
        hours.push(hour);

        schedulingTimeHour.hour = hours;
        schedulingTimeHour.availableHour = false;
        schedulingTimeHour.numCollaboratorAvailable = 3;

        const schedulingTime: SchedulingTime = new SchedulingTime()
        schedulingTime.schedulingDate = new Date()

        schedulingTimeHour.schedulingTime = schedulingTime;

        result.setschedulingTimeHour = schedulingTimeHour;
    }
    protected newResult(): AddNewTimeSlotResult {
        return new AddNewTimeSlotResult();
    }

}