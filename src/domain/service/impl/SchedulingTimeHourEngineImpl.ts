
import { injectable } from "tsyringe";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { TimeSlotParams } from "../../../application/model/scheduling-manager/TimeSlotParams";
import { TimeSlotResult } from "../../../application/model/scheduling-manager/TimeSlotResult";
import { ISchedulingTimeEngine } from "../ISchedulingTimeEngine";
import { AddNewTimeSlotOperation } from "../../operation/scheduling-manager/AddNewTimeSlotOperation";


@injectable()
export class SchedulingTimeEngineImpl extends GenericOperationTemplate implements ISchedulingTimeEngine {

    async add_new_time_slot(params: TimeSlotParams):  Promise<TimeSlotResult> {
        return await this.executeOperation(new AddNewTimeSlotOperation(), params)
    }

}
