import { TokenSession } from "../../../domain/model/TokenSession";
import { TimeSlotParams } from "../../../application/model/scheduling-manager/TimeSlotParams";
import { TimeSlotResult } from "../../../application/model/scheduling-manager/TimeSlotResult";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationNames } from "../../operation/OperationNames";
import { NotImplementedException } from "../../../infrestructure/exceptions/NotImplementedException";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { SchedulingTime } from "../../model/SchedulingTime";

import logger from "../../../infrestructure/config/logger";
import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";

export class AddNewTimeSlotOperation extends UserAuthOperationTemplate<TimeSlotResult, TimeSlotParams>{



    constructor() {
        super(OperationNames.ADD_NEW_TIME_SLOT, new OperationValidatorManager)
    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params:TimeSlotParams , result: TimeSlotResult) {

        // TO BE IMPLEMENT
        logger.info("Chegou aqui na adição do slot horário")
        const schedulingTimeHour: SchedulingTime = new SchedulingTime()
        const hours: string[] = [];
        //const hour: Hour = new Hour()

       // hour.hourCode = "11h30"
        //hour.hourDesignation = "11 horas e 30 min"
        //hours.push(hour);

      //  schedulingTimeHour.hour = hours;
       // schedulingTimeHour.availableHour = false;
        schedulingTimeHour.numCollaboratorAvailable = 3;

        //const schedulingTime: SchedulingTime = new SchedulingTime()
        //schedulingTime.schedulingDate = new Date()

        //schedulingTimeHour.schedulingTime = schedulingTime;

        result.setschedulingTimeHour = schedulingTimeHour;
    }
    protected initResult(): TimeSlotResult {
        return new TimeSlotResult();
    }

}