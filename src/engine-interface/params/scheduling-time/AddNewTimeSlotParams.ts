import { AuthParams } from "../../AuthParams";
import { AuthParamsTemplate } from "../../AuthParamsTemplate";

export class AddNewTimeSlotParams extends AuthParamsTemplate{

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