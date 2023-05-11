import { injectable } from "tsyringe";
import { AddNewSchedulingParams } from "../../../application/model/scheduling-manager/scheduling/AddNewSchedulingParams";
import { SchedulingResult } from "../../../application/model/scheduling-manager/scheduling/AddNewSchedulingResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { ISchedulingEngine } from "../ISchedulingEngine";
import { AddNewSchedulingOperation } from "../../operation/scheduling-manager/scheduling/AddNewSchedulingOperation";

@injectable()
export class SchedulingEngineImpl extends GenericOperationTemplate implements ISchedulingEngine {
    add_new_scheduling(params: AddNewSchedulingParams): Promise<SchedulingResult> {
        return this.executeOperation(new AddNewSchedulingOperation(), params)
    }

}