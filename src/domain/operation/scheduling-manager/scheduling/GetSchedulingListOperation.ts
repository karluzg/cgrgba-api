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
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomErrorMessage";
import { PageUtil } from "../../util/PageUtil";
export class GetSchedulingListOperation extends UserAuthOperationTemplate<GetSchedulingListResult, GetSchedulingListParams>{

    private readonly schedulingEngineRepository: ISchedulingEngineRepository;
    private beginCreationDate: Date
    private endCreationDate: Date


    constructor() {
        super(OperationNamesEnum.SCHEDULING_LIST, OperationValidatorManager.getSingletonInstance())
        this.schedulingEngineRepository = container.resolve<ISchedulingEngineRepository>('ISchedulingEngineRepository')
    }

    protected async doValidateParameters(params: GetSchedulingListParams): Promise<void> {


        logger.info("[GetSchedulingListOperation] Begin of strict validation scheduling parameteres...")

        const { getBeginSchedulingTime, getEndSchedulingTime, getBeginCreationDate, getEndCreationDate } = params;

        if (getEndSchedulingTime) {
            if (getEndSchedulingTime.length !== 5) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_END_SCHEDULING_TIME,
                    MiddlewareBusinessMessage.SCHEDULING_END_SCHEDULING_TIME_INAVLID);
            }

            if (!getBeginSchedulingTime) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_END_SCHEDULING_TIME,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_SCHEDULING_TIME_MANDATORY
                );
            }

            if (getBeginSchedulingTime === '') {
                throw new InvalidParametersException(
                    Field.SCHEDULING_BEGIN_SCHEDULING_TIME,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_SCHEDULING_TIME_MANDATORY
                );
            }

            if (getBeginSchedulingTime.length !== 5) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_BEGIN_SCHEDULING_TIME,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_SCHEDULING_TIME_INAVLID
                );
            }

            const beginSchedulingTime = await SchedulingTimeUtil.getTimePart(getBeginSchedulingTime);
            const endSchedulingTime = await SchedulingTimeUtil.getTimePart(getEndSchedulingTime);
            const beginSchedulingMinute = await SchedulingTimeUtil.getMinutePart(getBeginSchedulingTime);
            const endSchedulingMinute = await SchedulingTimeUtil.getMinutePart(getEndSchedulingTime);

            if (
                endSchedulingTime < beginSchedulingTime ||
                (beginSchedulingTime === endSchedulingTime && endSchedulingMinute < beginSchedulingMinute)
            ) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_TIME_END_SCHEDUULING_TIME,
                    MiddlewareBusinessMessage.SCHEDULING_TIME_END_SCHEDULING_TIME_GREATER_THAN_BEGIN_SCHEDULING_TIME
                );
            }
        } else if (getBeginSchedulingTime) {
            if (getBeginSchedulingTime.length !== 5) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_BEGIN_SCHEDULING_TIME,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_SCHEDULING_TIME_INAVLID
                );
            }
        }

        if (getBeginCreationDate) {
            console.info("[GetSchedulingListOperation] BeginCreationDate is filled. Validate if it is a valid date.");
            const isValidBeginCreationDate = await SchedulingTimeUtil.isValidDate(getBeginCreationDate);
            if (!isValidBeginCreationDate) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_BEGIN_CREATION_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_CREATION_DATE_INVALID
                );
            }
        }

        if (getEndCreationDate) {
            console.info("EndCreationDate is filled. Validate if it is a valid date.");
            const isValidEndCreationDate = await SchedulingTimeUtil.isValidDate(getEndCreationDate);
            if (!isValidEndCreationDate) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_END_CREATION_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_END_CREATION_DATE_INVALID
                );
            }
        }

        logger.info("Validate if end scheduling date is filled");

        const isValidBeginCreationDate = !isNaN(new Date(getBeginCreationDate).getTime());
        const isValidEndCreationDate = !isNaN(new Date(getEndCreationDate).getTime());

        if (isValidEndCreationDate) {
            if (!isValidBeginCreationDate) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_BEGIN_CREATION_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_CREATION_DATE_INVALID);
            }

            const beginDateWithoutTime = new Date(params.getBeginCreationDate);
            beginDateWithoutTime.setHours(0, 0, 0, 0); // Set the time components to zero

            console.info("CURRENT DATE: " + beginDateWithoutTime);

            const beginCreationDate = startOfDay(beginDateWithoutTime);
            const endCreationDate = startOfDay(addDays(beginDateWithoutTime, 1));

            if (endCreationDate.getTime() < beginCreationDate.getTime()) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_END_CREATION_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE
                );
            }

            this.beginCreationDate = beginCreationDate;
            this.endCreationDate = endCreationDate;
        } else if (isValidBeginCreationDate) {


            const beginDateWithoutTime = new Date(params.getBeginCreationDate.substring(0, 10));
            const beginCreationDate = startOfDay(beginDateWithoutTime);
            const endCreationDate = startOfDay(addDays(beginDateWithoutTime, 1));

            this.beginCreationDate = beginCreationDate;
            this.endCreationDate = endCreationDate;

            logger.info("Begin default Date:", beginCreationDate);
            logger.info("End default Date:", endCreationDate);


        } else {
            const beginCreationDateDefault = await SchedulingTimeUtil.getDefaultCreationDateWithouTime();
            logger.info("begin default Date:", beginCreationDateDefault);

            this.beginCreationDate = startOfDay(new Date(beginCreationDateDefault));
            this.endCreationDate = startOfDay(addDays(this.beginCreationDate, 1));
        }



        logger.info("[GetSchedulingListOperation] validate if end scheduling time input is filled")


    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetSchedulingListParams, result: GetSchedulingListResult): Promise<void> {


        //this.beginCreationDate = startOfDay(this.beginCreationDate);
        //this.endCreationDate = addDays(this.endCreationDate, 1);

        const defaultOrderColumn = await PageUtil.getDefaultOrderColumn(params.getOrderColumn);
        const skiptPage = await PageUtil.skipPage(params.getPageNumber, params.getPageSize);
        const defaultStatus = await PageUtil.getDefaultStatus(params.getBeginSchedulingStatus);
        const defaultDirection = await PageUtil.getDefaultDirection(params.getDirection);



        logger.info("Set default parameters to execute query...")

        const beginSchedulingTime = await SchedulingTimeUtil.getTimePart(params.getBeginSchedulingTime);
        const endchedulingTime = await SchedulingTimeUtil.getTimePart(params.getEndSchedulingTime);

        const beginSchedulingMinute = await SchedulingTimeUtil.getMinutePart(params.getEndSchedulingTime);
        const endSchedulingMinute = await SchedulingTimeUtil.getMinutePart(params.getEndSchedulingTime);




        const page: IPage<Scheduling> = await this.schedulingEngineRepository.findBy(this.beginCreationDate,
            this.endCreationDate,
            beginSchedulingTime,
            endchedulingTime,
            beginSchedulingMinute,
            endSchedulingMinute,
            defaultStatus,
            defaultOrderColumn,
            defaultDirection,
            skiptPage,
            params.getPageNumber,
            params.getPageSize);

        PageableUtils.ofWithoutContent(result, page)

    }
    protected initResult(): GetSchedulingListResult {
        return new GetSchedulingListResult();
    }

}