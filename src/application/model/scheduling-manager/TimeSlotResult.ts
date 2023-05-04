import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";
import { SchedulingTime } from "../../../domain/model/SchedulingTime";

export class TimeSlotResult extends ResultTemplate {

   private schedulingTimeHour: SchedulingTime

   public get getschedulingTimeHour(): SchedulingTime {
      return this.schedulingTimeHour;
   }
   set setschedulingTimeHour(schedulingTimeHour: SchedulingTime) {
      this.schedulingTimeHour = schedulingTimeHour;
   }

}



