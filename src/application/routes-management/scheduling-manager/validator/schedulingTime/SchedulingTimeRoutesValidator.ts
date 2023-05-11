import { query } from "express"
import { ValidationChain, body, param } from "express-validator"
import { ParamsValidatorTemplate } from "../../../../../infrestructure/template/ParamsValidatorTemplate"


export class SchedulingTimeRoutesValidator extends ParamsValidatorTemplate {

    public addNewTimeSlot(): ValidationChain[] {
        return [
            body('beginSchedulingDate').notEmpty().isLength({ min: 10, max: 10 }).isString(),
            body('endSchedulingDate').isLength({ min: 10, max: 10 }).isString().isString(),
            body('beginWorkTime').notEmpty().isLength({ min: 5, max: 5 }).isString(),
            body('beginLunchTime').notEmpty().isLength({ min: 5, max: 5 }).isString(),
            body('endLunchTime').notEmpty().isLength({ min: 5, max: 5 }).isString(),
            body('serviceInterval').notEmpty().isNumeric(),
            body('availableCollaboratorNumber').notEmpty().isLength({ min: 1 }).isNumeric()
        ]

    }

    public getTimeSlotList(): ValidationChain {
        return body('beginSchedulingDate').notEmpty().isLength({ min: 10, max: 10 }).isString()
    }
}
