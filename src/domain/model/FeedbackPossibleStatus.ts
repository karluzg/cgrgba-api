import { PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
import { FeedbackStatus } from "./FeedbackStatus";
@Entity({ schema: 'portal_consular_dev' })
export class FeedbackPossibleStatus{

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @ManyToOne(() => FeedbackStatus, feedbackStatus => feedbackStatus.code)
    currentStatus: FeedbackStatus;
    
    @ManyToOne(() => FeedbackStatus, feedbackStatus => feedbackStatus.code)
    nextStatus: FeedbackStatus;
    

    get code(): string {
        return this.currentStatus.code;
      }
}

