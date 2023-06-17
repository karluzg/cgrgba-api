import { container } from "tsyringe";
import { GetSchedulingStatictiscsResult as GetSchedulingStatisticsResult } from "../../../../application/model/scheduling-manager/scheduling/GetSchedulingStatictiscsResult";
import { GetSchedulingStatictiscsParams as GetSchedulingStatiticsParams } from "../../../../application/model/scheduling-manager/scheduling/params/GetSchedulingStatictiscsParams";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { TokenSession } from "../../../model/TokenSession";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { ISchedulingEngineRepository } from "../../../repository/ISchedulingEngineRepository";
import logger from "../../../../infrestructure/config/logger";

export class GetSchedulingStatisticsOperatin extends UserAuthOperationTemplate<GetSchedulingStatisticsResult, GetSchedulingStatiticsParams>{
   
   
    private readonly schedulingEngineRepository: ISchedulingEngineRepository;
   
   
    constructor() {
        super(OperationNamesEnum.SCHEDULING_GET_STATISTICS, OperationValidatorManager.getSingletonInstance())
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository')
    }

   
    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetSchedulingStatiticsParams, result: GetSchedulingStatisticsResult): Promise<void> {
   logger.info("[GetSchedulingStatisticsOperatin] Start processing scheduling statistics...")
   
        const schedulingStatistics = await this.schedulingEngineRepository.getSchedulingStatistics()
        result.setTotalSchedulingDay = schedulingStatistics.totalSchedulingDay;
         
        result.setTotalAttendScheduling = schedulingStatistics.totalAttendScheduling;
         
        result.setTotalSchedulinForAnswering = schedulingStatistics.totalSchedulingForAnswering;
         
        result.setTotalSchedulingCanceled = schedulingStatistics.totalSchedulingCanceled;
    }
    protected initResult(): GetSchedulingStatisticsResult {
      return new GetSchedulingStatisticsResult()
    }

}