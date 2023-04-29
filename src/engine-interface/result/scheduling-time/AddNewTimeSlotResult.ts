import { Result } from "../../Result";
import { SchedulingTimeHour } from "../../../domain-model/SchedulingTimeHour";

export class AddNewTimeSlotResult extends Result {

   private schedulingTimeHour: SchedulingTimeHour

   public get getschedulingTimeHour(): SchedulingTimeHour {
      return this.schedulingTimeHour;
   }
   set setschedulingTimeHour(schedulingTimeHour: SchedulingTimeHour) {
      this.schedulingTimeHour = schedulingTimeHour;
   }

}



