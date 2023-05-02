import { IAuthParams } from "../../../infrestructure/interface/IAuthParams";
import { AuthParamsTemplate } from "../../../infrestructure/template/AuthParamsTemplate";

export class TimeSlotParams extends AuthParamsTemplate{

  private date:Date
  private serviceInterval: number


    constructor(authenticationToken:string, date:Date,serviceInterval: number){
        super(authenticationToken);
        this.date=date;
        this.serviceInterval=serviceInterval;

      }

      get getdate(): Date{
        return this.date
      }
      get getServiceInterval(): number{
        return this.serviceInterval
      }   
}