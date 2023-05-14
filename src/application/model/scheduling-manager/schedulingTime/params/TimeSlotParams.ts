
import { AuthParamsTemplate } from "../../../../../infrestructure/template/AuthParamsTemplate";

export class TimeSlotParams extends AuthParamsTemplate {

  private readonly beginSchedulingDate: string;
  private readonly endSchedulingDate: string;
  private readonly beginWorkTime: string;
  private readonly endWorkTime: string;
  private readonly beginLunchTime: string;
  private readonly endLunchTime: string;
  private readonly serviceInterval: number;
  private readonly availableCollaboratorNumber: number;


  constructor(authenticationToken, beginSchedulingDate: string, endschedulingDate: string, beginWorkTime: string, endWorkTime: string,
    beginLunchTime: string, endLunchTime: string, serviceInterval: number, availableCollaboratorNumber: number) {
    super(authenticationToken);
    this.beginSchedulingDate = beginSchedulingDate;
    this.endSchedulingDate = endschedulingDate;
    this.beginWorkTime = beginWorkTime;
    this.endWorkTime = endWorkTime;
    this.beginLunchTime = beginLunchTime;
    this.endLunchTime = endLunchTime;
    this.serviceInterval = serviceInterval;
    this.availableCollaboratorNumber = availableCollaboratorNumber;

  }

  get getBeginSchedulingDate(): string {
    return this.beginSchedulingDate
  }

  get getEndSchedulingDate(): string {
    return this.endSchedulingDate
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