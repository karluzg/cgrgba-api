import { container } from "tsyringe";
import { GetFeedbackMessageListResult } from "../../../application/model/feedback/GetFeedbackListResult";
import { GetFeedbackListParams } from "../../../application/model/feedback/params/GetFeedbackListParams";
import { UserAuthOperationTemplate } from "../../../infrestructure/template/UserAuthOperationTemplate";
import { OperationValidatorManager } from "../../../infrestructure/validator/managers/OperationValidatorManager";
import { TokenSession } from "../../model/TokenSession";
import { OperationNamesEnum } from "../../model/enum/OperationNamesEnum";
import { IFeedbackEngineRepository } from "../../repository/IFeedbackEngineRepository";
import logger from "../../../infrestructure/config/logger";
import { TimeUtil } from "../util/SchedulingTimeUtil";
import { InvalidParametersException } from "../../../infrestructure/exceptions/InvalidParametersException";
import { Field } from "../../../infrestructure/exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../../../infrestructure/response/enum/MiddlewareCustomMessage";
import { addDays, startOfDay } from "date-fns";
import { Feedback } from "../../model/Feedback";
import { PageUtil } from "../util/PageUtil";
import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { FeedbackBuilder } from "../response-builder/feedback/FeedbackBuilder";
import { PageableUtils } from "../../../infrestructure/pageable-manager/PageableUtils";

export class GetFeedbackListOperation extends UserAuthOperationTemplate<GetFeedbackMessageListResult, GetFeedbackListParams>{

    private readonly feedbackEngineRepository: IFeedbackEngineRepository;
    private isbeignDateDayEqualEndDateDay: boolean = false;


    constructor() {
        super(OperationNamesEnum.FEEDBACK_LIST, OperationValidatorManager.getSingletonInstance())
        this.feedbackEngineRepository = container.resolve<IFeedbackEngineRepository>('IFeedbackEngineRepository')
    }

    protected async doValidateParameters(params: GetFeedbackListParams): Promise<void> {
        logger.info("[GetFeedbackMessageListOperation] Begin of strict validation get feedback list parameters...");

        const { getBeginFeedbackDate: getBeginDate, getEndFeedbackDate: getEndDate } = params;



        if (getBeginDate) {
            logger.info("[GetFeedbackMessageListOperation] getBeginDate is filled. Validate if it is a valid date.");
            const isValidBeginCreationDate = await TimeUtil.isValidDate(getBeginDate);
            if (!isValidBeginCreationDate) {
                throw new InvalidParametersException(Field.FEEDBACK_BEGIN_DATE, MiddlewareBusinessMessage.FEEDBACK_BEGIN_DATE_INVALID);
            }
        }

        if (getEndDate) {
            logger.info("EndDate is filled. Validate if it is a valid date.");
            const isValidEndCreationDate = await TimeUtil.isValidDate(getEndDate);
            if (!isValidEndCreationDate) {
                throw new InvalidParametersException(Field.FEEDBACK_END_DATE, MiddlewareBusinessMessage.FEEDBACK_END_DATE_INVALID);
            }

            if (!getBeginDate) {
                throw new InvalidParametersException(Field.FEEDBACK_BEGIN_DATE, MiddlewareBusinessMessage.FEEDBACK_BEGIN_DATE_INVALID);
            }
        }

        if (getBeginDate && getEndDate) {
            const newBeginDate = new Date(getBeginDate);
            const newEndDate = new Date(getEndDate);

            if (newEndDate.getTime() < newBeginDate.getTime()) {
                throw new InvalidParametersException(
                    Field.FEEDBACK_END_DATE,
                    MiddlewareBusinessMessage.FEEDBACK_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE
                );
            }

            const beginSchedulingDateDay = new Date(getBeginDate).getDate();
            const endSchedulingDateDay = new Date(getEndDate).getDate();

            this.isbeignDateDayEqualEndDateDay = beginSchedulingDateDay === endSchedulingDateDay;

            const beginSchedulingDate = new Date(getBeginDate);
            const endSchedulingDate = new Date(getEndDate);

            if (endSchedulingDate.getTime() < beginSchedulingDate.getTime()) {
                throw new InvalidParametersException(
                    Field.FEEDBACK_END_DATE,
                    MiddlewareBusinessMessage.FEEDBACK_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE
                );
            }
        }

        logger.info("[GetSchedulingListOperation] End of strict validation get scheduling list parameters...");
    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetFeedbackListParams, result: GetFeedbackMessageListResult): Promise<void> {

        logger.info("Set default parameters to execute query...");

        let beginFeedbackgDate: Date;
        let endFeedbackgDate: Date;

        console.info("[GetFeedbackMessageListOperation] Watch if begin feedback date is equal end date day", this.isbeignDateDayEqualEndDateDay);

        if (params.getBeginFeedbackDate) {
            logger.info("Filter by given feedback date");
            beginFeedbackgDate = startOfDay(new Date(params.getBeginFeedbackDate));
            endFeedbackgDate = startOfDay(addDays(beginFeedbackgDate, 1));
        }

        const defaultOrderColumn = await PageUtil.getDefaultOrderColumn(params.getOrderColumn);
        const skiptPage = await PageUtil.skipPage(params.getPageNumber, params.getPageSize);
        const defaultDirection = await PageUtil.getDefaultDirection(params.getDirection);

        const feedbackpages: IPage<Feedback> = await this.feedbackEngineRepository.findBy(
            beginFeedbackgDate,
            endFeedbackgDate,
            this.isbeignDateDayEqualEndDateDay,
            params.getFeedbackType,
            params.getStatus,
            defaultOrderColumn,
            defaultDirection,
            skiptPage,
            params.getPageNumber,
            params.getPageSize
        );

        const feedbackList: Feedback[] = await Promise.all(
            feedbackpages.content.map(feedback => FeedbackBuilder.buildFeedbackResponse(feedback))
        );

        PageableUtils.ofWithContent(result, feedbackpages, feedbackList);
    }

    protected initResult(): GetFeedbackMessageListResult {
        return new GetFeedbackMessageListResult();
    }

}