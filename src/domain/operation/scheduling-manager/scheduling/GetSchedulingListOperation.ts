import { container } from "tsyringe";
import { GetSchedulingListResult } from "../../../../application/model/scheduling-manager/scheduling/GetSchedulingListResult";
import { GetSchedulingListParams } from "../../../../application/model/scheduling-manager/scheduling/params/GetSchedulingListParams";
import { UserAuthOperationTemplate } from "../../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../../model/TokenSession";
import { OperationNamesEnum } from "../../../model/enum/OperationNamesEnum";
import { startOfDay, addDays } from 'date-fns';
import { ISchedulingEngineRepository } from "../../../repository/ISchedulingEngineRepository";
import { Scheduling } from "../../../model/Scheduling";
import { IPage } from "../../../../infrestructure/pageable-manager/IPage";
import { PageableUtils } from "../../../../infrestructure/pageable-manager/PageableUtils";
import { SchedulingTimeUtil } from "../../util/SchedulingTimeUtil";
import logger from "../../../../infrestructure/config/logger";
import { InvalidParametersException } from "../../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { PageUtil } from "../../util/PageUtil";
import { SchedulingResponseBuilder } from "../../response-builder/scheduling-manager/SchedulingResponseBuilder";

export class GetSchedulingListOperation extends UserAuthOperationTemplate<GetSchedulingListResult, GetSchedulingListParams>{

    private readonly schedulingEngineRepository: ISchedulingEngineRepository;

    private beginSchedulingDateDefault: Date
    private endSchedulingDateDefault: Date


    constructor() {
        super(OperationNamesEnum.SCHEDULING_LIST, OperationValidatorManager.getSingletonInstance())
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository')
    }

    protected async doValidateParameters(params: GetSchedulingListParams): Promise<void> {


        logger.info("[GetSchedulingListOperation] Begin of strict validation scheduling parameteres...")

        console.info("Input query params:", JSON.stringify(params))

        const { getBeginCreationDate, getEndCreationDate } = params;

        if (getBeginCreationDate) {
            console.info("[GetSchedulingListOperation] BeginCreationDate is filled. Validate if it is a valid date.");
            const isValidBeginCreationDate = await SchedulingTimeUtil.isValidDate(getBeginCreationDate);
            if (!isValidBeginCreationDate) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_BEGIN_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_DATE_INVALID
                );
            }
        }

        if (getEndCreationDate) {
            console.info("EndCreationDate is filled. Validate if it is a valid date.");
            const isValidEndCreationDate = await SchedulingTimeUtil.isValidDate(getEndCreationDate);
            if (!isValidEndCreationDate) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_END_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_END_DATE_INVALID
                );
            }
            if (!getBeginCreationDate) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_BEGIN_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_DATE_INVALID
                );
            }
        }


        const newBeginDate = new Date(getBeginCreationDate);
        const newEndDate = new Date(getEndCreationDate);

        if (newEndDate.getTime() < newBeginDate.getTime()) {
            throw new InvalidParametersException(
                Field.SCHEDULING_END_DATE,
                MiddlewareBusinessMessage.SCHEDULING_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE
            );
        }
      

      
        const beginCreationDate = startOfDay(new Date(getBeginCreationDate));

        const endCreationDate = startOfDay(addDays(new Date(getEndCreationDate), 1));

        if (endCreationDate.getTime() < beginCreationDate.getTime()) {
            throw new InvalidParametersException(
                Field.SCHEDULING_END_DATE,
                MiddlewareBusinessMessage.SCHEDULING_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE
            );
        }

       logger.info("Check if the default begin date is existing scheduling date in date base")
        const beginCreationDateDefault = await SchedulingTimeUtil.getDefaultCreationDateWithouTime();
        const date = await SchedulingTimeUtil.getDateWithoutTime(new Date(beginCreationDateDefault))
    
        const currentSchedulingsDate: Scheduling[] = await this.schedulingEngineRepository.findSchedulingCurrentDate(date)
        
        logger.info("CURRENT SCHEDULINGS DATE", JSON.stringify(currentSchedulingsDate))

        if (currentSchedulingsDate.length !== 0) {

            this.beginSchedulingDateDefault = startOfDay(new Date(beginCreationDateDefault));
            this.endSchedulingDateDefault = startOfDay(addDays(this.beginSchedulingDateDefault, 1));
        }

        logger.info("[GetSchedulingListOperation] validate if end scheduling time input is filled")


    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetSchedulingListParams, result: GetSchedulingListResult): Promise<void> {


        logger.info("Set default parameters to execute query...")

        const defaultOrderColumn = await PageUtil.getDefaultOrderColumn(params.getOrderColumn);
        const skiptPage = await PageUtil.skipPage(params.getPageNumber, params.getPageSize);
        const defaultDirection = await PageUtil.getDefaultDirection(params.getDirection);





        const schedulingPages: IPage<Scheduling> = await this.schedulingEngineRepository.findBy(this.beginSchedulingDateDefault,
            this.endSchedulingDateDefault,
            params.getCategoryCode,
            params.getServiceCode,
            params.getSchedulingStatus,
            defaultOrderColumn,
            defaultDirection,
            skiptPage,
            params.getPageNumber,
            params.getPageSize);



        const schedulingList: Scheduling[] = await Promise.all(schedulingPages.content
            .map(user => SchedulingResponseBuilder.buildSchedulingResponse(user)));

        PageableUtils.ofWithContent(result, schedulingPages, schedulingList)
        }
    

    protected initResult(): GetSchedulingListResult {
        return new GetSchedulingListResult();
    }

}

