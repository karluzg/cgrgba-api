import { Scheduling } from "../../../../domain/model/Scheduling";
import { PageableResult } from "../../../../infrestructure/pageable-manager/PageableResult";
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";

export class GetSchedulingListResult extends PageableResult<Scheduling> {

    /* private schedulings: Scheduling[];
 
     public get getSchedulings(): Scheduling[] {
         return this.schedulings;
     }
     public set setSchedulings(schedulings: Scheduling[]) {
         this.schedulings = schedulings;
     }
 */
}