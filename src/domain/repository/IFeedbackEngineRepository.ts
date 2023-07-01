import { DirectionEnum } from "../../infrestructure/pageable-manager/enum/DirectionEnum"
import { IPage } from "../../infrestructure/pageable-manager/IPage"
import { Feedback } from "../model/Feedback"
import { FeedbackStatusEnum } from "../model/enum/FeedbackStatusEnum"
import { FeedbackTypeEnum } from "../model/enum/FeedbackTypeEnum"

export interface IFeedbackEngineRepository{
    saveFeedback(feedback: Feedback): Promise<Feedback>
    findBy(beginSchedulingDate: Date,
        endSchedulingDate: Date,
        isbeignDateDayEqualEndDateDay:boolean,
        messageType: FeedbackTypeEnum,
        status: FeedbackStatusEnum,
        orderColumn: string,
        direction: DirectionEnum,
        skip: number,
        pageNumber: number,
        pageSize: number): Promise<IPage<Feedback>>

    findFeedbackById(feedbackId: number): Promise<Feedback>

}