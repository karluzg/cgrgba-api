import { ResultTemplate } from "../../../infrestructure/template/ResultTemplate";
import { SchedulingTimeHour } from "../../../domain/model/SchedulingTimeHour";

export class TimeSlotResult extends ResultTemplate {

   private schedulingTimeHour: SchedulingTimeHour

   public get getschedulingTimeHour(): SchedulingTimeHour {
      return this.schedulingTimeHour;
   }
   set setschedulingTimeHour(schedulingTimeHour: SchedulingTimeHour) {
      this.schedulingTimeHour = schedulingTimeHour;
   }

}



