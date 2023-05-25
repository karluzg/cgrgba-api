import { SchedulingResult } from "../../../../application/model/scheduling-manager/scheduling/SchedulingResult";
import { GetSchedulingDetailParams } from "../../../../application/model/scheduling-manager/scheduling/params/GetSchedulingDetailParams";
import container from "../../../../infrestructure/config/injection";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { Scheduling } from "../../../model/Scheduling";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { ISchedulingPossibleStatusEngineRepository } from "../../../repository/IPossibleStatusEngineRepository";
import { ISchedulingEngineRepository } from "../../../repository/ISchedulingEngineRepository";

export class GetSchedulingDetailOperation extends UserAuthOperationTemplate<SchedulingResult, GetSchedulingDetailParams> {

    private readonly schedulingEngineRepository: ISchedulingEngineRepository;
    private readonly schedulingPossibleStatusEngineRepository: ISchedulingPossibleStatusEngineRepository;


    private schedulingEntity: Scheduling;


    constructor() {
        super(OperationNamesEnum.SCHEDULING_DETAIL, OperationValidatorManager.getSingletonInstance())
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository')
        this.schedulingPossibleStatusEngineRepository = container.resolve<ISchedulingPossibleStatusEngineRepository>('ISchedulingPossibleStatusEngineRepository')

    }

    protected async doValidateParameters(params: GetSchedulingDetailParams): Promise<void> {

        this.schedulingEntity = await this.schedulingEngineRepository.findSchedulingById(params.getSchedulingId)


        console.info("WATCH SCHEDULINGG CATEGORY ENTITY:" + this.schedulingEntity)

        if (!this.schedulingEntity) {
            throw new InvalidParametersException(Field.SCHEDULING_ID, MiddlewareBusinessMessage.SCHEDULING_ID_INVALID)
        }
    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetSchedulingDetailParams, result: SchedulingResult): Promise<void> {

        result.setScheduling = this.schedulingEntity

        const schedulingPossibleStatus = await this.schedulingPossibleStatusEngineRepository.findNextStatus(this.schedulingEntity.status)
        result.setPossibleStatus = schedulingPossibleStatus

    }
    protected initResult(): SchedulingResult {
        return new SchedulingResult();
    }
}