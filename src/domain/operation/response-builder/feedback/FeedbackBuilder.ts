import { Feedback } from "../../../model/Feedback";

export class FeedbackBuilder{
    public static  async buildFeedbackResponse(feedback: Feedback): Promise<Feedback> {
        delete feedback.enumOperationTemplate;
        delete feedback.year;
        delete feedback.month;
        delete feedback.day;

        if (feedback.updateBy) {
            delete feedback.updateBy.enumOperationTemplate;
            delete feedback.updateBy.passwordHash;
            delete feedback.updateBy.passwordSalt;
            delete feedback.updateBy.passwordTry;
        }

        if (feedback.publishedBy) {
            delete feedback.publishedBy.enumOperationTemplate;
            delete feedback.publishedBy.passwordHash;
            delete feedback.publishedBy.passwordSalt;
            delete feedback.publishedBy.passwordTry;
        }


        return feedback;
    }
}