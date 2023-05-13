import { injectable } from "tsyringe";
import { SchedulingParams } from "../../../application/model/scheduling-manager/scheduling/SchedulingParams";
import { SchedulingResult } from "../../../application/model/scheduling-manager/scheduling/SchedulingResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { ISchedulingEngine } from "../ISchedulingEngine";
import { AddNewSchedulingOperation } from "../../operation/scheduling-manager/scheduling/AddNewSchedulingOperation";

@injectable()
export class SchedulingEngineImpl extends GenericOperationTemplate implements ISchedulingEngine {
    add_new_scheduling(params: SchedulingParams): Promise<SchedulingResult> {
        return this.executeOperation(new AddNewSchedulingOperation(), params)
    }

}