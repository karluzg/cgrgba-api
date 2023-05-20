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

        logger.info("[GetSchedlingListOperation] validate if end scheduling time input is filled. Otherwise, set default time gor begin and end scheduling time")
        if (typeof params.getEndSchedulingTime !== 'undefined' && params.getEndSchedulingTime !== '') {

            // length of hour should be 5-> 00:00
            if (params.getEndSchedulingTime.length != 5) {

                throw new InvalidParametersException(Field.SCHEDULING_END_SCHEDULING_TIME_INAVLID,
                    MiddlewareBusinessMessage.SCHEDULING_END_SCHEDULING_TIME_INAVLID);
            }

            if (typeof params.getBeginSchedulingTime == 'undefined') {
                throw new InvalidParametersException(Field.SCHEDULING_END_SCHEDULING_TIME_INAVLID,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_SCHEDULING_TIME_MANDATORY);

            }

            if (params.getBeginSchedulingTime == '') {

                throw new InvalidParametersException(Field.SCHEDULING_BEGIN_SCHEDULING_TIME,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_SCHEDULING_TIME_MANDATORY);

            }

            if (params.getBeginSchedulingTime.length != 5) {

                throw new InvalidParametersException(Field.SCHEDULING_BEGIN_SCHEDULING_TIME_INAVLID,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_SCHEDULING_TIME_INAVLID);
            }

            const beginSchedulingTime = await SchedulingTimeUtil.getTimePart(params.getBeginSchedulingTime);
            const endchedulingTime = await SchedulingTimeUtil.getTimePart(params.getEndSchedulingTime);

            const beginSchedulingMinute = await SchedulingTimeUtil.getMinutePart(params.getBeginSchedulingTime);
            const endSchedulingMinute = await SchedulingTimeUtil.getMinutePart(params.getEndSchedulingTime);


            if ((endchedulingTime < beginSchedulingTime) ||
                (beginSchedulingTime == endchedulingTime &&
                    endSchedulingMinute < beginSchedulingMinute)) {

                throw new InvalidParametersException(Field.SCHEDULING_TIME_END_SCHEDUULING_TIME,
                    MiddlewareBusinessMessage.SCHEDULING_TIME_END_SCHEDULING_TIME_GREATER_THAN_BEGIN_SCHEDULING_TIME)
            }
        } else if (typeof params.getBeginSchedulingTime !== 'undefined' && params.getBeginSchedulingTime !== '') {

            if (params.getBeginSchedulingTime.length != 5) {

                throw new InvalidParametersException(Field.SCHEDULING_BEGIN_SCHEDULING_TIME_INAVLID,
                    MiddlewareBusinessMessage.SCHEDULING_BEGIN_SCHEDULING_TIME_INAVLID);
            }

        }



        logger.info("[GetSchedlingListOperation] validate if end scheduling date is filled. Otherwise, set default Date for begin and end scheduling date")

        if (!isNaN(new Date(params.getEndCreationDate).getTime())) {
            if (isNaN(new Date(params.getBeginCreationDate).getTime())) {

                throw new InvalidParametersException(Field.SCHEDULING_BEGIN_CREATION_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_BGIN_CREATION_DATE_MANDATORY)
            } else {

                this.beginCreationDate = new Date(params.getBeginCreationDate)
                this.endCreationDate = new Date(params.getEndCreationDate)


                if (this.endCreationDate < this.beginCreationDate) {
                    throw new InvalidParametersException(Field.SCHEDULING_END_CREATION_DATE,
                        MiddlewareBusinessMessage.SCHEDULING_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE)
                }

            }
        } else {

            logger.info("[GetSchedlingListOperation] Set default beginSchedulingDate and endSchedulingDate");

            const beginCreationDateDefault = await SchedulingTimeUtil.getDefaultCreationDateWithouTime();
            logger.info("beginCreationDateDefault %", beginCreationDateDefault);

            this.beginCreationDate = new Date(beginCreationDateDefault);
            this.endCreationDate = this.beginCreationDate;

        }
    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetSchedulingListParams, result: GetSchedulingListResult): Promise<void> {

        this.beginCreationDate = startOfDay(this.beginCreationDate);
        this.endCreationDate = addDays(this.endCreationDate, 1);

        const defaultOrderColumn = await PageUtil.getDefaultOrderColumn(params.getOrderColumn);
        const skiptPage = await PageUtil.skipPage(params.getPageNumber, params.getPageSize);
        const defaultStatus = await PageUtil.getDefaultStatus(params.getBeginSchedulingStatus);
        const defaultDirection = await PageUtil.getDefaultDirection(params.getDirection);



        logger.info("[GetSchedlingListOperation] Set default paramenters to execute query...")

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