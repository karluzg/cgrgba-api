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

    private beginCreationDate: Date
    private endCreationDate: Date


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

            const newBeginCreationDate = new Date(beginDateWithoutTime.getFullYear(), beginDateWithoutTime.getMonth(), beginDateWithoutTime.getDate());
            // newBeginCreationDate.setHours(0, 0, 0, 0); // Set the time components to zero

            

            console.info("CURRENT DATE: " + newBeginCreationDate);


            const beginCreationDate = startOfDay(newBeginCreationDate);

            console.info("START OF DAY  " + newBeginCreationDate);

            const endCreationDate = startOfDay(addDays(beginDateWithoutTime, 1));

            if (endCreationDate.getTime() < beginCreationDate.getTime()) {
                throw new InvalidParametersException(
                    Field.SCHEDULING_END_CREATION_DATE,
                    MiddlewareBusinessMessage.SCHEDULING_END_CREATION_DATE_LESS_THAN_BEGIN_CREATION_DATE
                );
            }

            this.beginCreationDate = beginCreationDate; // to be use in query
            this.endCreationDate = endCreationDate; //to be use in query
        } else if (isValidBeginCreationDate) {

            const beginDateWithoutTime = new Date(params.getBeginCreationDate.substring(0, 10));
            beginDateWithoutTime.setHours(0, 0, 0, 0); // Set the time components to zero

            const beginCreationDate = startOfDay(beginDateWithoutTime);
            const endCreationDate = startOfDay(addDays(beginDateWithoutTime, 1));

            this.beginCreationDate = beginCreationDate; // to be use in query
            this.endCreationDate = endCreationDate; //to be use in query

            logger.info("Begin default Date:", beginCreationDate);
            logger.info("End default Date:", endCreationDate);


        } else {
            logger.info("begin and end date are null or empty. Set default filter date")
            const beginCreationDateDefault = await SchedulingTimeUtil.getDefaultCreationDateWithouTime();
            logger.info("begin default Date:", beginCreationDateDefault);

            this.beginCreationDate = startOfDay(new Date(beginCreationDateDefault));
            this.beginCreationDate.setHours(0, 0, 0, 0);
            this.endCreationDate = startOfDay(addDays(this.beginCreationDate, 1));
        }

        logger.info("[GetSchedulingListOperation] validate if end scheduling time input is filled")


    }


    protected async doUserAuthExecuted(tokenSession: TokenSession, params: GetSchedulingListParams, result: GetSchedulingListResult): Promise<void> {




        logger.info("Set default parameters to execute query...")

        const defaultOrderColumn = await PageUtil.getDefaultOrderColumn(params.getOrderColumn);
        const skiptPage = await PageUtil.skipPage(params.getPageNumber, params.getPageSize);
        const defaultStatus = await PageUtil.getDefaultStatus(params.getSchedulingStatus);
        const defaultDirection = await PageUtil.getDefaultDirection(params.getDirection);





        const schedulingPages: IPage<Scheduling> = await this.schedulingEngineRepository.findBy(this.beginCreationDate,
            this.endCreationDate,
            defaultStatus,
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

