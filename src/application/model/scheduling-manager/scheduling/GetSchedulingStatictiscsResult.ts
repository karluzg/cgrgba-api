
import { ResultTemplate } from "../../../../infrestructure/template/ResultTemplate";

export class GetSchedulingStatictiscsResult extends ResultTemplate{
    
    private totalSchedulingDay: number;
    private totalAttendScheduling: number;
    private totalSchedulinForAnswering: number;
    private totalSchedulingCanceled: number;

    get getTotalSchedulingDay(): number{
        return this.totalSchedulingDay;
    }

    set setTotalSchedulingDay(totalSchedulingDay:number){
         this.totalSchedulingDay=totalSchedulingDay
    }
    
    get getTotalAttendScheduling(): number{
        return this.totalAttendScheduling;
    }
    
    set setTotalAttendScheduling(totalAttendScheduling:number){
         this.totalAttendScheduling=totalAttendScheduling
    }

    get getTotalSchedulinForAnswering(): number{
        return this.totalSchedulinForAnswering;
    }
    
    set setTotalSchedulinForAnswering(totalSchedulinForAnswering:number){
         this.totalSchedulinForAnswering=totalSchedulinForAnswering
    }

    get getTotalSchedulingCanceled(): number{
        return this.totalSchedulingCanceled;
    }
    
    set setTotalSchedulingCanceled(totalSchedulingCanceled:number){
         this.totalSchedulingCanceled=totalSchedulingCanceled
    }
  
    
}
