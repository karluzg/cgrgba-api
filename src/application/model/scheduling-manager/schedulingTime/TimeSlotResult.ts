import { Hour } from "../../../../domain/model/Hour";
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";

export class TimeSlotResult extends ResultTemplate {

   private timeList: Hour[];

   public get getTimeList(): Hour[] {
      return this.timeList;
   }
   set setTimeList(timeList: Hour[]) {
      this.timeList = timeList;
   }

}



