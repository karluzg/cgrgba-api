import { TokenSession } from "../../../domain/model/TokenSession";
import { TimeSlotParams } from "../../../application/model/scheduling-manager/TimeSlotParams";
import { TimeSlotResult } from "../../../application/model/scheduling-manager/TimeSlotResult";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationNames } from "../../operation/OperationNames";

import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { SchedulingTime } from "../../model/SchedulingTime";

import logger from "../../../infrestructure/config/logger";


export class AddNewTimeSlotOperation extends UserAuthOperationTemplate<TimeSlotResult, TimeSlotParams>{



    constructor() {
        super(OperationNames.ADD_NEW_TIME_SLOT, new OperationValidatorManager)
    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params:TimeSlotParams , result: TimeSlotResult) {

        // TO BE IMPLEMENT
        logger.info("Chegou aqui na adição do slot horário")
        const schedulingTime: SchedulingTime = new SchedulingTime()
        const hours: string[] = [];
        schedulingTime.schedulingDate = new Date(params.getschedulingDate)
        schedulingTime.numCollaboratorAvailable = 3;

        //const schedulingTime: SchedulingTime = new SchedulingTime()
        //schedulingTime.schedulingDate = new Date()

        //schedulingTimeHour.schedulingTime = schedulingTime;

        result.setschedulingTimeHour = schedulingTime;
    }
    protected initResult(): TimeSlotResult {
        return new TimeSlotResult();
    }

}