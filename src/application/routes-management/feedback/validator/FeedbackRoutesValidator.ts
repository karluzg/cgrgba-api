import { ValidationChain, body, query } from "express-validator"
import { ParamsValidatorTemplate } from "../../../../infrestructure/template/ParamsValidatorTemplate"

export class FeedbackRoutesValidator extends ParamsValidatorTemplate {
    public addNewFeedbackvalidador(): ValidationChain[] {
        return [
            body('feedbackMessageType').notEmpty().isString(),
            body('citizenFullName').notEmpty().isLength({ max: 50 }).isString(),
            body('citizenEmail').notEmpty().isLength({ max: 34 }).isEmail(),
            body('message').notEmpty().isLength({ max: 150 }).isString(),

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
            body('feedbackStatus').notEmpty().isString(),

        ]
    }
}