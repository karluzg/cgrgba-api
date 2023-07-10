import { container } from "tsyringe";
import { TimeSlotResult } from "../../../../application/model/scheduling-manager/schedulingTime/TimeSlotResult";
import { TimeSlotListParams } from "../../../../application/model/scheduling-manager/schedulingTime/params/TimeSlotListParams";
import { SchedulingTimeConfiguration } from "../../../model/SchedulingTimeConfiguration";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { ISchedulingTimeEngineRepository } from "../../../repository/ISchedulingTimeEngineRepository";
import { TimeUtil } from "../../util/TimeUtil";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { IHollydayEngineRepository } from "../../../repository/IHollydayEngineRepository";
import { ISchedulingHistoryEngineRepository } from "../../../repository/ISchedulingHistoryEngineRespository";
import logger from "../../../../infrestructure/config/logger";
import { Hour } from "../../../model/Hour";
import { OperationTemplate } from "../../../../infrestructure/template/OperationTemplate";



export class GetTimeSlotListOperation extends OperationTemplate<TimeSlotResult, TimeSlotListParams>{



    private readonly schedulingTimeRepository: ISchedulingTimeEngineRepository;
    private readonly hollydayRepository: IHollydayEngineRepository;
    private readonly schedulingHistoryEngineRepository: ISchedulingHistoryEngineRepository;
  private schedulingTimeEntity: SchedulingTimeConfiguration[];
  private schedulingNotExist: boolean = false;
  private hourlist: Hour[] = [];

    private schedulingDateInput: Date


    constructor() {
        super(OperationNamesEnum.TIMESLOT_GET_LIST)
        this.schedulingTimeRepository = container.resolve<ISchedulingTimeEngineRepository>("ISchedulingTimeEngineRepository")
        this.hollydayRepository = container.resolve<IHollydayEngineRepository>("IHollydayEngineRepository")
        this.schedulingHistoryEngineRepository = container.resolve<ISchedulingHistoryEngineRepository>("ISchedulingHistoryEngineRepository")
    }

    protected async doValidateParameters(params: TimeSlotListParams): Promise<void> {

        logger.info("[GetTimeSlotListOperation] Begin strict validation scheduling time parameteres...")

        logger.info("[GetTimeSlotListOperation] - Input scheduling begin date received %s", params.getBeginSchedulingDate)

        const beginDate = new Date(params.getBeginSchedulingDate)
        const currentDate = new Date();

        if (beginDate < currentDate) {
          this.schedulingNotExist = true;
        }


        this.schedulingDateInput = new Date(params.getBeginSchedulingDate);

        logger.info("[GetTimeSlotListOperation] Input scheduling begin date converted %s", this.schedulingDateInput)


      const isWeekend = await TimeUtil.isweekend(this.schedulingDateInput);

      const isHollyday = await TimeUtil.isHollyDay(this.schedulingDateInput, this.hollydayRepository,
            "[GetTimeSlotListOperation]")


        if (isWeekend || isHollyday) {
          this.schedulingNotExist = true;
        }

        this.schedulingTimeEntity = await this.schedulingTimeRepository.findBySchedulingDate(this.schedulingDateInput)

        logger.info("[AddNewTimeSlotOperation] schedulingTime entity founded %", this.schedulingTimeEntity)


        if (this.schedulingTimeEntity.length == 0) {
          this.schedulingNotExist = true;
        }

        logger.info("[GetTimeSlotListOperation] End of strict validation scheduling time parameteres...")
    }

    protected async doExecute(params: TimeSlotListParams, result: TimeSlotResult): Promise<void> {


        logger.info("[AddNewTimeSlotOperation][doUserAuthExecuted] Begin building available hour list");

      if (this.schedulingNotExist) {
        result.setTimeList = this.hourlist;
      } else {

        this.hourlist = await this.buildAvailableHourList(params.getBeginSchedulingDate)
        result.setTimeList = this.hourlist;
      }

        logger.info("[AddNewTimeSlotOperation][doUserAuthExecuted] End building available hour list %", this.hourlist.length);

    }

    private async buildAvailableHourList(schedulingDate: string): Promise<Hour[]> {
        const hourListOutput: Hour[] = [];
      
      
        for (const schedulingTime of this.schedulingTimeEntity) {
          const hours = schedulingTime.hours;
      
          for (const hour of hours) {
            const value: string = hour.value;
      
            const isDateAndHourAvailable = await this.schedulingHistoryEngineRepository.checkIfSchedulingHistoryExist(
              schedulingDate,
              value
            );
      
            if (!isDateAndHourAvailable) {
              hourListOutput.push(hour);
            }
          }
        }
      
        return hourListOutput;
      }
      

    protected initResult(): TimeSlotResult {
        return new TimeSlotResult();
    }

}