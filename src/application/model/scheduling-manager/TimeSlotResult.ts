import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";
import { SchedulingTime } from "../../../domain/model/SchedulingTime";

export class TimeSlotResult extends ResultTemplate {

   private timeList: { [key: string]: string[] } = {};

   public get getTimeList(): { [key: string]: string[] } {
      return this.timeList;
   }
   set setTimeList(timeList: { [key: string]: string[] }) {
      this.timeList = timeList;
   }

}



