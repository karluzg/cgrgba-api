import { IAuthParams } from "../../../infrestructure/interface/IAuthParams";
import { AuthParamsTemplate } from "../../../infrestructure/template/AuthParamsTemplate";

export class TimeSlotParams extends AuthParamsTemplate{

  private schedulingDate: Date
  private intervalSlot: number


  constructor(authenticationToken: string, schedulingDate: Date, serviceInterval: number) {
        super(authenticationToken);
    this.schedulingDate = schedulingDate;
    this.intervalSlot = serviceInterval;

      }

  get getschedulingDate(): Date {
    return this.schedulingDate
      }
      get getServiceInterval(): number{
        return this.intervalSlot
      }   
}