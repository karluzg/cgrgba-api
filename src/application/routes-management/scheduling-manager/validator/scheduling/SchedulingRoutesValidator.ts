import { ValidationChain, query, body } from "express-validator"
import { ParamsValidatorTemplate } from "../../../../../infrestructure/template/ParamsValidatorTemplate"



export class SchedulingRoutesValidator extends ParamsValidatorTemplate {

    public addNewScheduling(): ValidationChain[] {
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

    public getUsers(): ValidationChain[] {
        return [
            query('pageNumber').isInt({ min: 1 }).optional(),
            query('pageSize').isInt({ min: 1 }).optional()
        ]

    }



}

