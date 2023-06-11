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
    private isbeignDateDayEqualEndDateDay: boolean = false;


    constructor() {
        super(OperationNamesEnum.SCHEDULING_LIST, OperationValidatorManager.getSingletonInstance())
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository')
    }

    protected async doValidateParameters(params: GetSchedulingListParams): Promise<void> {
        logger.info("[GetSchedulingListOperation] Begin of strict validation scheduling parameters...");

        const { getBeginSchedulingDate, getEndSchedulingDate, getCategoryCode, getServiceCode } = params;

        if (getCategoryCode && !getServiceCode) {
            throw new InvalidParametersException(Field.SCHEDULING_SERVICE, MiddlewareBusinessMessage.SCHEDULING_SERVICE_INVALID);
        }

        if (getServiceCode && !getCategoryCode) {
            throw new InvalidParametersException(Field.SCHEDULING_CATEGORY, MiddlewareBusinessMessage.SCHEDULING_CATEGORY_INVALD);
        }

        if (getBeginSchedulingDate) {
            console.info("[GetSchedulingListOperation] BeginSchedulingDate is filled. Validate if it is a valid date.");
            const isValidBeginCreationDate = await SchedulingTimeUtil.isValidDate(getBeginSchedulingDate);
            if (!isValidBeginCreationDate) {
                throw new InvalidParametersException(Field.SCHEDULING_BEGIN_DATE, MiddlewareBusinessMessage.SCHEDULING_BEGIN_DATE_INVALID);
            }
        }

        if (getEndSchedulingDate) {
            console.info("EndSchedulingDate is filled. Validate if it is a valid date.");
            const isValidEndCreationDate = await SchedulingTimeUtil.isValidDate(getEndSchedulingDate);
            if (!isValidEndCreationDate) {
                throw new InvalidParametersException(Field.SCHEDULING_END_DATE, MiddlewareBusinessMessage.SCHEDULING_END_DATE_INVALID);
            }

            if (!getBeginSchedulingDate) {
                throw new InvalidParametersException(Field.SCHEDULING_BEGIN_DATE, MiddlewareBusinessMessage.SCHEDULING_BEGIN_DATE_INVALID);
            }
        }

        if (getBeginSchedulingDate && getEndSchedulingDate) {
            const newBeginDate = new Date(getBeginSchedulingDate);
            const newEndDate = new Date(getEndSchedulingDate);

            if (newEndDate.getTime() < newBeginDate.getTime()) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_END_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE
                );
            }

            const beginSchedulingDateDay = new Date(getBeginSchedulingDate).getDate();
            const endSchedulingDateDay = new Date(getEndSchedulingDate).getDate();

            this.isbeignDateDayEqualEndDateDay = beginSchedulingDateDay === endSchedulingDateDay;

            const beginSchedulingDate = new Date(getBeginSchedulingDate);
            const endSchedulingDate = new Date(getEndSchedulingDate);

            if (endSchedulingDate.getTime() < beginSchedulingDate.getTime()) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_END_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE
                );
            }
        }

        logger.info("[GetSchedulingListOperation] validate if end scheduling time input is filled");
    }



    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetSchedulingListParams, result: GetSchedulingListResult): Promise<void> {
        logger.info("Set default parameters to execute query...");

        let beginSchedulingDate: Date;
        let endSchedulingDate: Date;

        console.info("Begin scheduling date is equal end date day", this.isbeignDateDayEqualEndDateDay);

        if (params.getBeginSchedulingDate) {
            logger.info("Filter by given scheduling date");
            beginSchedulingDate = startOfDay(new Date(params.getBeginSchedulingDate));
            endSchedulingDate = startOfDay(addDays(beginSchedulingDate, 1));
        } else {
            logger.info("Filter by default current scheduling date");
            const beginCreationDateDefault = await SchedulingTimeUtil.getDefaultCreationDateWithouTime();
            const currentSchedulingsDate: Scheduling[] = await this.schedulingEngineRepository.findSchedulingCurrentDate(beginCreationDateDefault);

            if (currentSchedulingsDate.length !== 0) {
                beginSchedulingDate = startOfDay(new Date(beginCreationDateDefault));
                endSchedulingDate = startOfDay(addDays(beginSchedulingDate, 1));
                this.isbeignDateDayEqualEndDateDay = true;
            }
        }

        const defaultOrderColumn = await PageUtil.getDefaultOrderColumn(params.getOrderColumn);
        const skiptPage = await PageUtil.skipPage(params.getPageNumber, params.getPageSize);
        const defaultDirection = await PageUtil.getDefaultDirection(params.getDirection);

        const schedulingPages: IPage<Scheduling> = await this.schedulingEngineRepository.findBy(
            beginSchedulingDate,
            endSchedulingDate,
            this.isbeignDateDayEqualEndDateDay,
            params.getCategoryCode,
            params.getServiceCode,
            params.getSchedulingStatus,
            defaultOrderColumn,
            defaultDirection,
            skiptPage,
            params.getPageNumber,
            params.getPageSize
        );

        const schedulingList: Scheduling[] = await Promise.all(
            schedulingPages.content.map(user => SchedulingResponseBuilder.buildSchedulingResponse(user))
        );

        PageableUtils.ofWithContent(result, schedulingPages, schedulingList);
    }


    protected initResult(): GetSchedulingListResult {
        return new GetSchedulingListResult();
    }

}

