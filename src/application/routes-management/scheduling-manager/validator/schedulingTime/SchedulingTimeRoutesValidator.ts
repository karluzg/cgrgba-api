
import { ValidationChain, body, query } from "express-validator"
import { ParamsValidatorTemplate } from "../../../../../infrestructure/template/ParamsValidatorTemplate"


export class SchedulingTimeRoutesValidator extends ParamsValidatorTemplate {

    public addNewTimeSlot(): ValidationChain[] {
        return [
            body('beginSchedulingDate').notEmpty().isLength({ min: 10, max: 10 }).isString(),
            body('endSchedulingDate').isLength({ min: 10, max: 10 }).isString().isString().optional(),
            body('beginWorkTime').notEmpty().isLength({ min: 5, max: 5 }).isString(),
            body('beginLunchTime').notEmpty().isLength({ min: 5, max: 5 }).isString(),
            body('endLunchTime').notEmpty().isLength({ min: 5, max: 5 }).isString(),
            body('serviceInterval').notEmpty().isNumeric(),
            body('availableCollaboratorNumber').notEmpty().isLength({ min: 1 }).isNumeric()
        ]

    }

    public getTimeSlotList(): ValidationChain[] {
        return [
            query('beginSchedulingDate').notEmpty().isLength({ min: 10, max: 10 }).isString()
        ] 
    }
}
