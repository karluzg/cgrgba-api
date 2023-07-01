import { injectable } from "tsyringe";
import { IPage } from "../../../infrestructure/pageable-manager/IPage";
import { DirectionEnum } from "../../../infrestructure/pageable-manager/enum/DirectionEnum";
import { Feedback } from "../../model/Feedback";
import { FeedbackStatusEnum } from "../../model/enum/FeedbackStatusEnum";
import { FeedbackTypeEnum } from "../../model/enum/FeedbackTypeEnum";
import { IFeedbackEngineRepository } from "../IFeedbackEngineRepository";
import { PageImpl } from "../../../infrestructure/pageable-manager/PageImpl";

const myDataSource = require('../../../domain/meta-inf/data-source');
const feedbackEngineRepository = myDataSource.getRepository(Feedback)

@injectable()
export class FeedbackEngineRepositoryImpl implements IFeedbackEngineRepository{


   async saveFeedback(feedback: Feedback): Promise<Feedback> {
       return await feedbackEngineRepository.save(feedback)
    }
   
 async   findBy(beginDate: Date,
    endDate: Date,
        isbeignDateDayEqualEndDateDay: boolean,
        messageType: FeedbackTypeEnum,
        status: FeedbackStatusEnum,
        defaultOrderColumn: string,
        direction: DirectionEnum,
        skip: number,
        pageNumber: number,
        pageSize: number): Promise<IPage<Feedback>> {
   
     
            const orderColumn = `feedback.${defaultOrderColumn}`; // to avoid SQL Injection
  
            const query = feedbackEngineRepository.createQueryBuilder('feedback')
              .leftJoinAndSelect("feedback.status", "status")
              .leftJoinAndSelect("feedback.type", "type")
      
        
            if (!beginDate && !endDate && !messageType && !status) {
              // No filters applied, return an empty page of results
              return new PageImpl<Feedback>([], pageNumber, pageSize, 0, 0);
            }
        
        
            if (beginDate) {

              query.where('feedback.year >= :beginDateYear', {
                beginDateYear: beginDate.getFullYear()
              })
                .andWhere('feedback.month >= :beginDateMonth', {
                  beginDateMonth: beginDate.getMonth() + 1
                })
                .andWhere('feedback.day >= :beginDateDay', {
                  beginDateDay: beginDate.getDate()
                })
                .andWhere('feedback.year <= :endDateYear', {
                  endDateYear: endDate.getFullYear()
                })
                .andWhere('feedback.month <= :endDateMonth', {
                  endDateMonth: endDate.getMonth() + 1
                })
                .andWhere('feedback.day <= :endDateDay', {
                  endDateDay: isbeignDateDayEqualEndDateDay ? beginDate.getDate() : endDate.getDate()
                });
            }
          
          
            if (status && status !== FeedbackStatusEnum.REMOVED) {
            
              query.andWhere('(status.code LIKE :status)', {
                status: `%${status}%`
              });
            }
          
            if (messageType) {
            
              query.andWhere('type.code LIKE :messageType', { messageType: `%${messageType}%` });
     }
     
     query.orderBy(orderColumn, direction);
     const [items, totalItems] = await query
       .skip(skip)
       .take(pageSize)
       .getManyAndCount();
 
   
     const totalPages = Math.ceil(totalItems / pageSize);
   
     return new PageImpl<Feedback>(items, pageNumber, pageSize, totalItems, totalPages);
   }
   
  
   async findFeedbackById(feedbackId: number): Promise<Feedback> {
        return feedbackEngineRepository
        .createQueryBuilder('feedback')
        .leftJoinAndSelect('feedback.type', 'type')
        .leftJoinAndSelect('feedback.status', 'status')
        .andWhere('feedback.id = :feedbackId', { feedbackId: feedbackId })
        .getOne();
    }
  
}
