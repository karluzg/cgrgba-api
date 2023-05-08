
import { AuthParamsTemplate } from "../../../../infrestructure/template/AuthParamsTemplate";

export class AddTimeSlotParams extends AuthParamsTemplate {

  private beginschedulingDate: string;
  private endschedulingDate: string;
  private beginWorkTime: string;
  private endWorkTime: string;
  private beginLunchTime: string;
  private endLunchTime: string;
  private serviceInterval: number;
  private availableCollaboratorNumber: number;


  constructor(authenticationToken, beginSchedulingDate: string, endschedulingDate: string, beginWorkTime: string, endWorkTime: string,
    beginLunchTime: string, endLunchTime: string, serviceInterval: number, availableCollaboratorNumber: number) {
    super(authenticationToken);
    this.beginschedulingDate = beginSchedulingDate;
    this.endschedulingDate = endschedulingDate;
    this.beginWorkTime = beginWorkTime;
    this.endWorkTime = endWorkTime;
    this.beginLunchTime = beginLunchTime;
    this.endLunchTime = endLunchTime;
    this.serviceInterval = serviceInterval;
    this.availableCollaboratorNumber = availableCollaboratorNumber;

  }

  get getBeginSchedulingDate(): string {
    return this.beginschedulingDate
  }

  get getEndSchedulingDate(): string {
    return this.endschedulingDate
  }

  get getBeginWorkTime(): string {
    return this.beginWorkTime
  }

  get getEndWorkTime(): string {
    return this.endWorkTime
  }

  get getBeginLunchTime(): string {
    return this.beginLunchTime
  }

  get getEndLunchTime(): string {
    return this.endLunchTime
  }

  get getServiceInterval(): number {
    return this.serviceInterval
  }

  get getAvailableCollaboratorNumber(): number {
    return this.availableCollaboratorNumber
  }

}