import { Scheduling } from "../../../../domain/model/Scheduling";
import { PageableResult } from "../../../../infrestructure/pageable-manager/PageableResult";
import { SchedulingResponse } from "../../../../domain/operation/response-builder/scheduling-manager/SchedulingResponse";


export class GetSchedulingListResult extends PageableResult<SchedulingResponse> {

}