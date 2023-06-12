import { container } from "tsyringe";
import { SchedulingResult } from "../../../../application/model/scheduling-manager/scheduling/SchedulingResult";
import { GetSchedulingDetailParams } from "../../../../application/model/scheduling-manager/scheduling/params/GetSchedulingDetailParams";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { ISchedulingEngineRepository } from "../../../repository/ISchedulingEngineRepository";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { Scheduling } from "../../../model/Scheduling";
import { ISchedulinStatusEngineRepository } from "../../../repository/ISchedulinStatusEngineRepository";
import { SchedulingStatus } from "../../../model/SchedulingStatus";
import { ISchedulingPossibleStatusEngineRepository } from "../../../repository/ISchedulingPossibleStatusEngineRepository";
import { ChangeSchedulingStatusParams } from "../../../../application/model/scheduling-manager/scheduling/params/ChangeSchedulingStatusParams";
import { SchedulingPossibleStatus } from "../../../model/SchedulingPossibleStatus";
import logger from "../../../../infrestructure/config/logger";
import { SchedulingResponseBuilder } from "../../response-builder/scheduling-manager/SchedulingResponseBuilder";

export class ChangeSchedulingStatusOperation extends UserAuthOperationTemplate<SchedulingResult, ChangeSchedulingStatusParams> {

    private readonly schedulingEngineRepository: ISchedulingEngineRepository;
    private readonly schedulingStatusRepository: ISchedulinStatusEngineRepository;
    private readonly schedulingPossibleStatusEngineRepository: ISchedulingPossibleStatusEngineRepository;
    private schedulingEntitySource: Scheduling;
    private schedulingStatusSource: SchedulingStatus;
    private nextPossibleSchedulingStatus: SchedulingPossibleStatus[];
    private matchingNextStatus;
  
    constructor() {
        super(OperationNamesEnum.SCHEDULING_CHANGE_STATUS, OperationValidatorManager.getSingletonInstance());
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository');
        this.schedulingStatusRepository = container.resolve<ISchedulinStatusEngineRepository>('ISchedulinStatusEngineRepository');
        this.schedulingPossibleStatusEngineRepository = container.resolve<ISchedulingPossibleStatusEngineRepository>('ISchedulingPossibleStatusEngineRepository');
    }
  
    protected async doValidateParameters(params: ChangeSchedulingStatusParams): Promise<void> {
   
        logger.info("[ChangeSchedulingStatusOperation] Begin of strict validation of change scheduling status parameters...");
        this.schedulingEntitySource = await this.schedulingEngineRepository.findSchedulingById(params.getSchedulingId);
        if (!this.schedulingEntitySource) {
            throw new InvalidParametersException(Field.SCHEDULING_ID, MiddlewareBusinessMessage.SCHEDULING_ID_INVALID);
        }
  
        this.schedulingStatusSource = await this.schedulingStatusRepository.findSchedulingStatus(params.getSchedulingStatusCode);

        if (!this.schedulingStatusSource) {
            throw new InvalidParametersException(Field.SCHEDULING_STATUS_CODE, MiddlewareBusinessMessage.SCHEDULING_STATUS_CODE_INVALID);
        }
  
        this.nextPossibleSchedulingStatus = await this.schedulingPossibleStatusEngineRepository.findSchedulingNextStatus(this.schedulingEntitySource.status.code);

        console.info("Next Possible status", JSON.stringify(this.nextPossibleSchedulingStatus))
        console.info("Next Possible status INPUT:", params.getSchedulingStatusCode)
 
        const targetCode = "ANSWERED";
        this.matchingNextStatus = this.nextPossibleSchedulingStatus.find(
            (nextStatus: SchedulingPossibleStatus) => nextStatus.nextStatus.code === targetCode
        );
        
        console.info("Matched next status",JSON.stringify(this.matchingNextStatus))

        if (!this.matchingNextStatus) {
            throw new InvalidParametersException(Field.SCHEDULING_STATUS_CODE, MiddlewareBusinessMessage.SCHEDULING_STATUS_CODE_INVALID);
        }

        logger.info("[ChangeSchedulingStatusOperation] End of strict validation of change scheduling status parameters...");
    }
  

    protected async doUserAuthExecuted(tokenSession: TokenSession, params: ChangeSchedulingStatusParams, result: SchedulingResult): Promise<void> {
      

        const newScheduling = await this.updateSheduling(tokenSession)

        const newSchedulingResponse = await SchedulingResponseBuilder.buildSchedulingResponse(newScheduling);
        
        result.setScheduling = newSchedulingResponse;

        this.nextPossibleSchedulingStatus = await this.schedulingPossibleStatusEngineRepository.findSchedulingNextStatus(newScheduling.status.code);

        result.setPossibleStatus = this.nextPossibleSchedulingStatus;
   
   
    }

    private async updateSheduling(tokenSession: TokenSession): Promise<Scheduling> {

        logger.info("[AddNewSchedulingOperation] Changing scheduling status...")
        this.schedulingEntitySource.status = this.matchingNextStatus.nextStatus
        this.schedulingEntitySource.attendBy = tokenSession.user;
        this.schedulingEntitySource.attendDate=new Date()
                return await this.schedulingEngineRepository.saveScheduling(this.schedulingEntitySource);
               
    }
      
    protected initResult(): SchedulingResult {
        return new SchedulingResult();
    }

}