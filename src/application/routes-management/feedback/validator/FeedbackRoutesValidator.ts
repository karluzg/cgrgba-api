import { ValidationChain, body, query } from "express-validator"
import { ParamsValidatorTemplate } from "../../../../infrestructure/template/ParamsValidatorTemplate"
import { MiddlewareBusinessMessage } from "../../../../infrestructure/response/enum/MiddlewareCustomMessage"

export class FeedbackRoutesValidator extends ParamsValidatorTemplate {
    public addNewFeedbackvalidador(): ValidationChain[] {
        return [
            body('feedbackMessageType').notEmpty().isString().notEmpty().withMessage(MiddlewareBusinessMessage.FEEDBACK_MESSAGE_TYPE_CODE_MANDATORY),
            body('citizenFullName').notEmpty().isLength({ max: 50 }).isString().withMessage(MiddlewareBusinessMessage.FEEDBACK_NAME_MANDATORY),
            body('citizenEmail').notEmpty().isLength({ max: 34 }).isEmail().isString().withMessage(MiddlewareBusinessMessage.FEEDBACK_EMAIL_MANDATORY),
            body('message').notEmpty().isLength({ max: 150 }).isString().withMessage(MiddlewareBusinessMessage.FEEDBACK_MESSAGE_MANDATORY)

        ]
    }

    public getFeedbackListValidator(): ValidationChain[] {
        return [
            query('beginFeedbackDate').isLength({ min: 10, max: 10 }).optional(),
            query('endFeedbackDate').isLength({ min: 10, max: 10 }).optional(),
            query('page').isInt({ min: 1 }).optional(),
            query('size').isInt({ min: 1 }).optional(),
            query('direction').isIn(['ASC', 'DESC']).optional(),
            query('orderColumn').isString().optional()
        ]
    }

    public updateSchedulingValidator(): ValidationChain[] {
        return [
            body('feedbackStatus').notEmpty().isString().withMessage(MiddlewareBusinessMessage.FEEDBACK_STATUS_INVALID)

        ]
    }
}