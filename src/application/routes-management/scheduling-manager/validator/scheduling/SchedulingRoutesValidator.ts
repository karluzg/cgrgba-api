import { ValidationChain, body, query } from "express-validator"
import { ParamsValidatorTemplate } from "../../../../../infrestructure/template/ParamsValidatorTemplate"



export class SchedulingRoutesValidator extends ParamsValidatorTemplate {

    public addNewSchedulingvalidador(): ValidationChain[] {
        return [
            body('citizenFullName').notEmpty().isLength({ max: 50 }).isString(),
            body('citizenEmail').notEmpty().isLength({ max: 34 }).isEmail(),
            body('citizenMobileNumber').isLength({ min: 9, max: 21 }).isString().isString(),
            body('schedulingDate').notEmpty().isLength({ min: 10, max: 10 }).isString(),
            body('schedulingHour').notEmpty().isLength({ min: 5, max: 5 }).isString(),
            body('categoryCode').notEmpty().isString(),
            body('serviceCode').notEmpty().isString()
        ]
    }

    public getSchedulingListValidator(): ValidationChain[] {
        return [
            query('beginSchedulingDate').isLength({ min: 10, max: 10 }).optional(),
            query('endSchedulingDate').isLength({min:10, max:10}).optional(),
            query('page').isInt({ min: 1 }).optional(),
            query('size').isInt({ min: 1 }).optional(),
            query('direction').isIn(['ASC', 'DESC']).optional(),
            query('orderColumn').isString().optional()
        ]
    }

    public updateSchedulingValidator(): ValidationChain[] {
        return [
            body('schedulingDate').notEmpty().isLength({ min: 10, max: 10 }).isString(),
            body('schedulingHour').notEmpty().isLength({ min: 5, max: 5 }).isString(),
            body('categoryCode').notEmpty().isString(),
            body('serviceCode').notEmpty().isString()
        ]
    }

}

