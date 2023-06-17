import { injectable } from "tsyringe";
import { SchedulingParams } from "../../../application/model/scheduling-manager/scheduling/SchedulingParams";
import { SchedulingResult } from "../../../application/model/scheduling-manager/scheduling/SchedulingResult";
import { GenericOperationTemplate } from "../../../infrestructure/template/GenericOperationTemplate";
import { ISchedulingEngine } from "../ISchedulingEngine";
import { AddNewSchedulingOperation } from "../../operation/scheduling-manager/scheduling/AddNewSchedulingOperation";
import { GetSchedulingListResult } from "../../../application/model/scheduling-manager/scheduling/GetSchedulingListResult";
import { GetSchedulingListParams } from "../../../application/model/scheduling-manager/scheduling/params/GetSchedulingListParams";
import { GetSchedulingListOperation } from "../../operation/scheduling-manager/scheduling/GetSchedulingListOperation";
import { GetSchedulingDetailParams } from "../../../application/model/scheduling-manager/scheduling/params/GetSchedulingDetailParams";
import { GetSchedulingDetailOperation } from "../../operation/scheduling-manager/scheduling/GetSchedulingDetailOperation";
import { UpdateSchedulingParams } from "../../../application/model/scheduling-manager/scheduling/params/UpdateSchedulingParams";
import { UpdateSchedulingOperation } from "../../operation/scheduling-manager/scheduling/UpdateSchedulingOperation";
import { ChangeSchedulingStatusOperation as ChangeSchedulingStatusOperation } from "../../operation/scheduling-manager/scheduling/ChangeSchedulingStatusOperation";
import { ChangeSchedulingStatusParams } from "../../../application/model/scheduling-manager/scheduling/params/ChangeSchedulingStatusParams";
import { GetSchedulingStatictiscsResult } from "../../../application/model/scheduling-manager/scheduling/GetSchedulingStatictiscsResult";
import { GetSchedulingStatictiscsParams } from "../../../application/model/scheduling-manager/scheduling/params/GetSchedulingStatictiscsParams";
import { GetSchedulingStatisticsOperatin } from "../../operation/scheduling-manager/scheduling/GetSchedulingStatictiscsOperatin";


@injectable()
export class SchedulingEngineImpl extends GenericOperationTemplate implements ISchedulingEngine {


    update_scheduling(params: UpdateSchedulingParams): Promise<SchedulingResult> {
        return this.executeOperation(new UpdateSchedulingOperation(), params)
    }

    get_scheduling_detail(params: GetSchedulingDetailParams): Promise<SchedulingResult> {
        return this.executeOperation(new GetSchedulingDetailOperation(), params)
    }

    add_new_scheduling(params: SchedulingParams): Promise<SchedulingResult> {
        return this.executeOperation(new AddNewSchedulingOperation(), params)
    }

    get_scheduling_list(params: GetSchedulingListParams): Promise<GetSchedulingListResult> {
        return this.executeOperation(new GetSchedulingListOperation(), params)
    }
    change_scheduling_status(params: ChangeSchedulingStatusParams): Promise<SchedulingResult> {
        return this.executeOperation(new ChangeSchedulingStatusOperation(), params)
    }
    get_scheduling_statistics(params: GetSchedulingStatictiscsParams): Promise<GetSchedulingStatictiscsResult> {
        return this.executeOperation(new GetSchedulingStatisticsOperatin(), params)
    }
}