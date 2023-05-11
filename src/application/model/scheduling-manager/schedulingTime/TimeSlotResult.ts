import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";

export class TimeSlotResult extends ResultTemplate {

   private timeList: string[];

   public get getTimeList(): string[] {
      return this.timeList;
   }
   set setTimeList(timeList: string[]) {
      this.timeList = timeList;
   }

}



